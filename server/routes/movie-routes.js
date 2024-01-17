import express from "express";
import {
  addMovie,
  getMovieById,
  getMovies,
} from "../controllers/movie-controller.js";
// from other folders/files

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", addMovie);

export default router;
