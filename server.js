import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import busRoutes from "./routes/buslocarionUpdate.js";
import Bus from "./model/temp2.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

connectDB();



io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

app.use("/bus", busRoutes);

app.get("/all", async (req, res) => {
  try {
    const buses = await Bus.find().sort({ updatedAt: -1 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/active-buses", async (req, res) => {
  const since = new Date(Date.now() - 15000);
  const buses = await Bus.find({ updatedAt: { $gte: since } });
  res.json(buses);
});


server.listen(10000, () => {
  console.log("Server running on 10000");
});
