import dotenv from "dotenv";
dotenv.config();
// rom other folders/files
import app from "./app.js";

// port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Application listening on port: ${port}`);
});
