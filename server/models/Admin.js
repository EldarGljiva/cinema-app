import mongoose from "mongoose";
// Importing the database connection configuration
import db from "../config/db.js";

// Defining admin schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  addedMovies: [{ type: mongoose.Types.ObjectId, ref: "Movie" }],
});

// Creating Admin model from the defined schema
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
