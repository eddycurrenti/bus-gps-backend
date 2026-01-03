import express from "express";
import BusLocation from "../model/Bus1.js";
import { uploadLocation, getBusHistory } from "../controllers/upload.js";

const router = express.Router();

router.post("/upload", uploadLocation);
router.get("/history/:busId", async (req, res) => {
  try {
    const { busId } = req.params;

    const history = await BusLocation.find({ busId })
      .sort({ createdAt: 1 }) // oldest → newest
      .limit(500);            // safety limit

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


