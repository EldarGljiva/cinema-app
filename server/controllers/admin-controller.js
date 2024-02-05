import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import Admin from "../models/Admin.js";

// Controller function to add a new admin
export const addAdmin = async (req, res, next) => {
  // Taking user input and assigning it to variables
  const { email, password } = req.body;

  // Checking for empty inputs
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingAdmin;

  try {
    // Checking if admin's email already exists in the database
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  // Handling case where admin already exists
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  let admin;

  // Hash the password before storing it
  const hashedPassword = bcrypt.hashSync(password);

  try {
    // Save the new admin to the database
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    return console.log(err);
  }

  // Handling case where admin isn't save to database
  if (!admin) {
    return res.status(500).json({ message: "Unable to store admin" });
  }

  // Return a success response with the created admin
  return res.status(201).json({ admin });
};

// Controller function for admin login
export const adminLogin = async (req, res, next) => {
  // Taking input and storing it into variables
  const { email, password } = req.body;

  // Validation check for empty inputs
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingAdmin;

  try {
    // Find the admin with the provided email
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  // Handle case where admin isn't found
  if (!existingAdmin) {
    return res.status(404).json({ message: "Admin not found!" });
  }

  // Check if the password is correct
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  // Handling case when password is incorrect
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

  try {
    // Retrieve all admins from the database
    // find() returns an empty array if no values were found
    admins = await Admin.find();
  } catch (err) {
    return console.log(err);
  }

  // Handle case of an error
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  // Return a success response with the list of admins
  return res.status(200).json({ admins });
};
