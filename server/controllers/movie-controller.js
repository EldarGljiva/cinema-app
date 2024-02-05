import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
// From other Folders/Files
import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";

export const addMovie = async (req, res, next) => {
  // Extract token from request headers
  const extractedToken = req.headers.authorization.split(" ")[1]; // Bearer token

  // Handle case where token is not provided
  if (!extractedToken || extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }

  let adminId;

  // Verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  // Extract inputs and asign them to variables
  const { title, description, releaseDate, posterUrl, featured } = req.body;

  // Check if inputs are empty
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    // Create new instance of the Movie model
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      admin: adminId,
      posterUrl,
    });
    // Start a database session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // Find the admin user by ID
    const adminUser = await Admin.findById(adminId);

    // Save the movie within the transaction
    await movie.save({ session });

    // Update the admin's addedMovies array
    adminUser.addedMovies.push(movie);

    // Save the admin user within the transaction
    await adminUser.save({ session });

    // Commit the transaction
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  // Check if the movie was not created
  if (!movie) {
    return res.status(500).json({ message: "Request failed" });
  }

  // Return a successful response with the created movie
  return res.status(201).json({ movie });
};

export const getMovies = async (req, res, next) => {
  let movies;
  try {
    // Find all movies from database
    movies = await Movie.find();
  } catch (err) {
    return next(err);
  }

  // Handle case where no movie was found
  if (!movies) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  // If movies were found, return them
  return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  // Extracting user ID from request parameters
  let movieId = req.params.id;

  let movie;
  try {
    // Find movie by id
    movie = await Movie.findById(movieId);
  } catch (err) {
    return next(err);
  }

  // Handle case where no movie was found by the provided id
  if (!movie) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  // Return a movie
  return res.status(200).json({ movie });
};
