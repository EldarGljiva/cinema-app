import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";

// Port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Application listening on port: ${port}`);
});
