import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
  });
});
