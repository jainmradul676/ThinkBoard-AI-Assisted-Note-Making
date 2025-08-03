import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

const app = express();
dotenv.config({ override: true }); // Load environment variables

const PORT = process.env.PORT || 5001;

// Middlewares - ordr of middlewares matters
app.use(cors({ origin: "http://localhost:5173" })); // Enable CORS for frontend requests
app.use(express.json()); // Middleware to parse JSON bodies - helping us fetch data from the request body otherwise it will be undefined
// custom middleware to log request details
// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next();
// });
app.use(rateLimiter); // Apply rate limiting middleware

app.use("/api/notes", notesRoutes);

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
