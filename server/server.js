import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

// config
import connectToMongoDB from "./config/database.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";

// connect to database first
connectToMongoDB();

// express
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 8080;
//start the server
app.listen(port, console.log(`🚀 Listening on port ${port}...`));
