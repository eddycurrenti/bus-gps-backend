import Bus from "../model/temp2.js";
import BusLocation from "../model/temp.js";

const uploadLocation = async (req, res) => {
  try {
    const { busId, routeId, lat, lng } = req.body;

    if (!busId || lat == null || lng == null) {
      return res.status(400).json({ success: false });
    }

    await Bus.findOneAndUpdate(
      { busId },
      { routeId, lat, lng, updatedAt: new Date() },
      { upsert: true }
    );

    await BusLocation.create({ busId, routeId, lat, lng });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { uploadLocation };
