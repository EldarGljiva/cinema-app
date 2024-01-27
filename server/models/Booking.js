import mongoose from "mongoose";

// from other folders/files
import db from "../config/db.js";

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

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
