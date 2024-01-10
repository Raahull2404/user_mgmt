import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";
import constants from "../constants/constants.js";
const secretKey = "My_secret_key";

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "no token provided!" });
  }

  jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: " User not authorised!" });
    }
    req._id = decode._id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const user = await User.findOne({ _id: req._id });

  if (user && User.userType == constants.userType.admin) {
    next();
  }
  return res.status(403).send({ message: "This task requires Admin role!" });
};

const isValidEmail = async (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default {
  isAdmin,
  isValidEmail,
  verifyToken,
};
