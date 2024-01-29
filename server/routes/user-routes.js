import express from "express";
// From other folders/files
import {
  getAllUsers,
  register,
  updateUser,
  deleteUser,
  login,
  getBookingsOfUser,
} from "../controllers/user-controller.js";

const router = express.Router();

// Routes
router.get("/users", getAllUsers);
router.post("/register", register);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/login", login);
router.get("/bookings/:id", getBookingsOfUser);

export default router;
