import express from "express";
// From other folders/files
import {
  addAdmin,
  adminLogin,
  getAdmins,
} from "../controllers/admin-controller.js";

const router = express.Router();

// Routes
router.post("/register", addAdmin);
router.post("/login", adminLogin);
router.get("/", getAdmins);

export default router;
