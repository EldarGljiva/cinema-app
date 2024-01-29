import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// From other folders/files
import Admin from "../models/Admin.js";

// Controller function to add a new admin
export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  // Validation check for empty inputs
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  // Check if admin with the given email already exists
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  // If admin already exists, return an error response
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }
  let admin;
  // Hash the password before storing it
  const hashedPassword = bcrypt.hashSync(password);
  // Save the new admin to the database
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }
  // If admin couldn't be stored, return an error response
  if (!admin) {
    return res.status(500).json({ message: "Unable to store admin" });
  }
  // Return a success response with the created admin
  return res.status(201).json({ admin });
};
// Controller function for admin login
export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // Validation check for empty inputs
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  // Find the admin with the provided email
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  // If admin not found, return an error response
  if (!existingAdmin) {
    return res.status(404).json({ message: "Admin not found!" });
  }
  // Check if the password is correct
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  // If password is incorrect, return an error response
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password Incorrect" });
  }
  // Generate a JWT token for authentication
  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "20d",
  });
  // Return a success response with the token and admin id
  return res.status(200).json({
    message: "Authentication Complete. Sucessfully Logged in",
    token,
    id: existingAdmin._id,
  });
};
// Controller function to get all admins
export const getAdmins = async (req, res, next) => {
  let admins;
  // Retrieve all admins from the database
  try {
    admins = await Admin.find();
  } catch (err) {
    return console.log(err);
  }
  // If admins couldn't be retrieved, return an error response
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  // Return a success response with the list of admins
  return res.status(200).json({ admins });
};
