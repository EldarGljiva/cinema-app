import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
//from other folders/files

const app = express();

//middleware
app.use(express.static("public")); //use public folder as static files
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Hello there");
});

export default app;
