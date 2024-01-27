import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
// From other folders/files
import userRoute from "./routes/user-routes.js";
import adminRoute from "./routes/admin-routes.js";
import movieRoute from "./routes/movie-routes.js";
import bookingRoute from "./routes/booking-routes.js";

const app = express();

// Enable cors
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/movie", movieRoute);
app.use("/api/booking", bookingRoute);

app.get("/", async (req, res) => {
  res.send("Hello there");
});

export default app;
