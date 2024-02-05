import mongoose from "mongoose";
import db from "../config/db.js";

// Defining booking schema
const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Creating Booking model from the defined schema
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
