import mongoose from "mongoose";

// from other folders/files
import db from "../config/db.js";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
