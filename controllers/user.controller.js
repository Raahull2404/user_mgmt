import User from "../models/user.model.js";
import constants from "../constants/constants.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSalt } from "bcrypt";
import Auth from "../config/auth.config.js";
import nodemailer from "nodemailer";
const salt = genSalt(10);

const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    res.status(500).send({ message: "Unexpected Internal Error!" });
  }
  if (!users) {
    return res.status(401).send({ message: "No user found!" });
  }
  return res.status(200).send({ users });
};

const register = async (req, res) => {
  const { name, email, password, phone, image } = req.body;
  const user = new User({
    name,
    email,
    password,
    phone,
    image,
  });
  const userData = await user.save();
  return res.status(201).send({ userData });
};

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email: req.body.email });
  } catch (error) {
    res.status(401).send({ message: "Internal Error! Try again..." });
  }
  const hashedPassword = bcrypt.hash(password, 10);
  if (email != User.email && !bcrypt.compare(password, hashedPassword)) {
    return res
      .status(403)
      .send({ message: "Email id or password is invalid!" });
  }
  return res.status(200).send({ message: "Login successfull!" });
};

export default {
  register,
  getAllUsers,
  login,
};
