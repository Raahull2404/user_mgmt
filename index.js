import express from "express";
import("dotenv").config;
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
const app = express();
const PORT = 4000 || process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://localhost:27017/user_mgmt",
  console.log("DB connected!")
);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
