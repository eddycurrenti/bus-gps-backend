import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  routeId: String,
  lat: Number,
  lng: Number,
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Bus", busSchema);
