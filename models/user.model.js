import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    image: {
      type: String,
    },
    userType: {
      type: String,
      required: true,
      default: "CUSTOMER",
    },
  },
  { Timestamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
