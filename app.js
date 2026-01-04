import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import rfs from "rotating-file-stream";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the current directory path

app.use("/assets", express.static(path.join(__dirname, "public", "assets"))); // Serve static assets from the "public/assets" directory
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(compression()); // Enable response compression
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security-related HTTP headers

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate log files daily
  size: "10M", // rotate every 10 MegaBytes written
});

app.use(morgan("combined", { stream: accessLogStream }));

export default app;
