//from other folders/files
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return next(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ users });
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  try {
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    // Create and save the new user
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(500).json({ message: "Unexpected Error Occurred" });
    }

    return res.status(201).json({ id: savedUser._id });
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  res.status(200).json({ message: "Updated Succesfully" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  res.status(200).json({ message: "Deleted Succesfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Unable to find user" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password Incorrect" });
  }

  return res.status(200).json({
    message: "Login Succesfull",
    id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
  });
};

export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;

  try {
    // Use populate to get additional details from the referenced Movie model
    bookings = await Booking.find({ user: id }).populate("movie");
  } catch (err) {
    return console.log(err);
  }

  if (!bookings) {
    return res.status(404).json({ message: "No bookings found for the user" });
  }

  // Transform the bookings array to include movieName
  const transformedBookings = bookings.map((booking) => ({
    _id: booking._id,
    date: booking.date,
    seatNumber: booking.seatNumber,
    user: booking.user,
    movieName: booking.movie.title,
  }));

  return res.status(200).json({ bookings: transformedBookings });
};
