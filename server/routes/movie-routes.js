import express from "express";
import {
  addMovie,
  getMovieById,
  getMovies,
} from "../controllers/movie-controller.js";

const router = express.Router();

// Routes
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", addMovie);

export default router;
