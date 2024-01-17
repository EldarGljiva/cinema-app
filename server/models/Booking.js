import mongoose from "mongoose";

// from other folders/files
import db from "../config/db.js";

const bookingSchema = new mongoose.Schema({
  movie: {
    type: String,
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
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
