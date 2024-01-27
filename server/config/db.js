import mongoose from "mongoose";

// Connect to Replica Set
mongoose
  .connect(
    "mongodb://DESKTOP-IUCD566:27017,DESKTOP-IUCD566:27018,DESKTOP-IUCD566:27019/yourDatabaseName?replicaSet=rs"
  )
  .then(() => {
    console.log("Database connected succesfully");
  })
  .catch((err) => {
    throw new Error(`Database connection error: ${err.message}`);
  });

export default mongoose.connection;
