import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
// from other folders/files
import userRoute from "./routes/user-routes.js";

const app = express();

// enable cors
app.use(cors());

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/api", userRoute);

app.get("/", async (req, res) => {
  res.send("Hello there");
});

export default app;
