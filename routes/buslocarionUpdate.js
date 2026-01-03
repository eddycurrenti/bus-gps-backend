import express from "express";
import { uploadLocation, getBusHistory } from "../controllers/upload.js";

const router = express.Router();

router.post("/upload", uploadLocation);
router.get("/history/:busId", getBusHistory); // 👈 NEW

export default router;
