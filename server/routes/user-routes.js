import express from "express";
// From other folders/files
import {
  getAllUsers,
  signup,
  updateUser,
  deleteUser,
  login,
  getBookingsOfUser,
} from "../controllers/user-controller.js";

const router = express.Router();

// Routes
router.get("/users", getAllUsers);
router.post("/signup", signup);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/login", login);
router.get("/bookings/:id", getBookingsOfUser);

export default router;
