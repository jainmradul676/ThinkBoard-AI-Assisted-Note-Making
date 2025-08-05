import dotenv from "dotenv";
dotenv.config({ override: true }); // Load environment variables first

import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import passport from "passport";
import cookieParser from "cookie-parser";
import "./config/passport.js";

const app = express();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve(); // Get the current directory name
// console.log("this is dir", __dirname);

// Middlewares - order of middlewares matters
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ 
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true 
  }));
}
// Enable CORS for frontend requests
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Middleware to parse JSON bodies - helping us fetch data from the request body otherwise it will be undefined
// custom middleware to log request details
// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next();
// });

app.use(rateLimiter); // Apply rate limiting middleware

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Connect to the database and start the server

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); // Exit the process with failure
  });
