import { startSession } from "mongoose";
import mongoose from "mongoose";
// From other folders/files
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

// Controller function to create a new booking
export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;
  // Find existing movie and user with given IDs
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  // Check if movie and user exist
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie Not Found With Given ID" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found with given ID" });
  }

  let booking;
  try {
    // Check if the provided date is a valid ISO string
    if (!Date.parse(date)) {
      throw new Error("Invalid date format");
    }
    // Create a new Booking instance
    booking = new Booking({
      movie,
      date: new Date(date),
      seatNumber,
      user,
    });
    // Start a Mongoose session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    // Update existing user and movie with the new booking
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    // Save changes to the database within the transaction
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    // Commit the transaction
    session.commitTransaction();
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "Invalid date format or other error occurred" });
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking, movieName: existingMovie.name });
};

// Controller function to get a booking by its ID
export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    // Find the booking with the provided ID
    booking = await Booking.findOne({ user: id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unexpected Error" });
  }

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  return res.status(200).json({ booking });
};

// Controller function to delete a booking by its ID
export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    // Find and delete the booking with the provided ID, user and movie are fields in Booking model
    booking = await Booking.findByIdAndDelete(id).populate("user movie");

    // Start a Mongoose session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // Save changes to the database within the transaction
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });

    // Commit the transaction
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Succesfully Deleted" });
};
