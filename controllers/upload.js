
// import Bus from "../model/temp2.js";
// import BusLocation from "../model/Bus1.js";

// const uploadLocation = async (req, res) => {
//   try {
//     const { busId, routeId, lat, lng } = req.body;

//     if (!busId || lat == null || lng == null) {
//       return res.status(400).json({ success: false });
//     }

//     const bus = await Bus.findOneAndUpdate(
//       { busId },
//       { routeId, lat, lng, updatedAt: new Date() },
//       { upsert: true, new: true }
//     );

//     await BusLocation.create({ busId, routeId, lat, lng });

//     // ✅ CORRECT: get io from express app
//     const io = req.app.get("io");
//     io.emit("busUpdate", bus);

//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// export { uploadLocation };

import Bus from "../model/temp2.js";
import BusLocation from "../model/Bus1.js";

const uploadLocation = async (req, res) => {
  try {
    const { busId, routeId, lat, lng } = req.body;

    if (!busId || lat == null || lng == null) {
      return res.status(400).json({ success: false });
    }

    // 🔥 MUST RETURN UPDATED DOC
    const bus = await Bus.findOneAndUpdate(
      { busId },
      { routeId, lat, lng, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    await BusLocation.create({ busId, routeId, lat, lng });

    // ✅ GET SAME IO INSTANCE
    const io = req.app.get("io");

    console.log("📡 Emitting busUpdate:", bus.busId);
    io.emit("busUpdate", bus);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

export { uploadLocation };
