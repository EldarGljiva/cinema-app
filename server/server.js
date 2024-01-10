import dotenv from "dotenv";
dotenv.config();
//from other folders/files
import app from "./app.js";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Application listening on port: ${port}`);
});
