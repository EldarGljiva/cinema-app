import express from "express";
// from other folders/files
import { addAdmin, adminLogin } from "../controllers/admin-controller.js";

const router = express.Router();

// routes
router.post("/signup", addAdmin);
router.post("/login", adminLogin);

export default router;
