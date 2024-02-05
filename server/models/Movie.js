import mongoose from "mongoose";
import db from "../config/db.js";

// Defining movie schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  admin: { type: mongoose.Types.ObjectId, ref: "Admin", required: true },
});

// Creating Movie model from the defined schema
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
