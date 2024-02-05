import express from "express";
import {
  newBooking,
  getBookingById,
  deleteBooking,
} from "../controllers/booking-controller.js";

const router = express.Router();

// Routes
router.post("/", newBooking);
router.get("/:id", getBookingById);
router.delete("/:id", deleteBooking);

export default router;
