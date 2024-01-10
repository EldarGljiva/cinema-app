import mongoose from "mongoose";
//from other folders/files
import db from "../config/db";

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  releaseYear: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
