import express from "express";
// from other folders/files
import { newBooking } from "../controllers/booking-controller.js";

const router = express.Router();

// routes
router.post("/", newBooking);

export default router;
