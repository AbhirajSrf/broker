import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = ENV.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log("Server running on port: ", PORT));
  } catch (error) {
    console.error("Failed to connect: ", error);
    process.exit(1);
  }
}

startServer();
