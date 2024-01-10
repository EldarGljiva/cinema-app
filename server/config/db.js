import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch((err) => {
    throw new Error(`Database connection error: ${err.message}`);
  });

export default mongoose.connection;
