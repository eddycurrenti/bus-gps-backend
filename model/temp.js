import mongoose from "mongoose";

const busLocationSchema = new mongoose.Schema({
  busId: String,
  routeId: String,
  lat: Number,
  lng: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("BusLocation", busLocationSchema);
