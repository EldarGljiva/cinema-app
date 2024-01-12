import express from "express";
// from other folders/files
import {
  getAllUsers,
  signup,
  updateUser,
  deleteUser,
  login,
} from "../controllers/user-controller.js";

const router = express.Router();

// routes
router.get("/users", getAllUsers);
router.post("/signup", signup);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/login", login);

export default router;
