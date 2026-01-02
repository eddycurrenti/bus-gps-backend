// import express from "express";
// import apl from "./routes/buslocarionUpdate.js";
// import buses from "./store/buses.js";
// import connectDB from "./config/db.js";

// connectDB();

// const app =  express();
// const port = process.env.PORT || 4000

// app.use(express.json());

// app.use('/bus',apl)
// app.get('/all', (req,res)=>{
//     res.json(Object.values(buses));
// })

// app.get('/',(req,res)=>{
//     res.send("API working");
// })


// app.listen(port , ()=>console.log('Started on port :'+port))

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import busRoutes from "./routes/buslocarionUpdate.js";
import Bus from "./model/temp2.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use("/bus", busRoutes);

app.use('/', (req,res) => {
  res.send("Welcome to my Buss live website");
});


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
  try {
    const ACTIVE_WINDOW_MS = 15000; // 15 seconds

    const since = new Date(Date.now() - ACTIVE_WINDOW_MS);

    const buses = await Bus.find({
      updatedAt: { $gte: since },
    }).lean();

    res.json(buses);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
