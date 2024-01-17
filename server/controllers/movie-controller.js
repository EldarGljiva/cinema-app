import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Movie from "../models/Movie.js";
dotenv.config();

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1]; // Bearer token
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  // create new movie
  const { title, description, releaseDate, posterUrl, featured } = req.body;
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
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      admin: adminId,
      posterUrl,
    });
    movie = await movie.save();
  } catch (err) {
    console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request failed" });
  }

  return res.status(201).json({ movie });
};

export const getMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    return next(err);
  }
  if (!movies) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  let movieId = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(movieId);
  } catch (err) {
    return next(err);
  }
  if (!movie) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ movie });
};
