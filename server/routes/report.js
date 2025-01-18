import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getReports } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", authMiddleware, getReports);

export default router;
