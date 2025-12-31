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

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use("/bus", busRoutes);

app.get("/all", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
