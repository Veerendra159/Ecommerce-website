import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productsRoute from "./routes/productsRoute.js";
import orderRoute from "./routes/orderRoute.js"
import dotenv from "dotenv";
import express from "express";


dotenv.config();
connectDB();


const app = express();
app.use(express.json())


app.use("/auth", authRoutes)
app.use("/api", productsRoute)
app.use("/api", orderRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => {
    console.log(`server running at ${PORT}`)
})
