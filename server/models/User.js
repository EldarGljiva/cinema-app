import mongoose from "mongoose";
import db from "../config/db.js";

// Defining user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

// Creating User model from the defined schema
const User = mongoose.model("User", userSchema);

export default User;
