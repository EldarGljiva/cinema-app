import User from "../models/User.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    // Find all users from the database
    users = await User.find();
  } catch (err) {
    return next(err);
  }
  // Handling case when no user was found
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  // Handling case where user/s are found
  return res.status(200).json({ users });
};

export const register = async (req, res, next) => {
  // Capturing user input by assigning it to variables
  const { name, email, password } = req.body;

  // Check for empty inputs
  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  try {
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });

    // Handle case where user is already registered
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash password using bcrypt
    const hashedPassword = bcrypt.hashSync(password);

    // Create and save the new user
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Handle case where user isn't saved
    if (!savedUser) {
      return res.status(500).json({ message: "Unexpected Error Occurred" });
    }

    // Handle case where user is saved
    return res.status(201).json({
      id: savedUser._id,
      userName: savedUser.name,
      userEmail: savedUser.email,
    });
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  // Extracting user ID from request parameters
  const id = req.params.id;

  // Taking user input and assigning it
  const { name, email, password } = req.body;

  // Checking for empty inputs
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

  // Hashing password using bcrypt
  const hashedPassword = bcrypt.hashSync(password);

  let user;

  try {
    // Finding user by id and updating it
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return next(err);
  }

  // Handling case where user was not updated
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  // Returning message that user was updated succesfully
  res.status(200).json({ message: "Updated Succesfully" });
};

export const deleteUser = async (req, res, next) => {
  // Extracting user ID from request parameters
  const id = req.params.id;

  let user;

  try {
    // Finding user by id and deleting it
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return next(err);
  }

  // Handling case wehre user was not deleted
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  // Returning succesfull message that user was deleted
  res.status(200).json({ message: "Deleted Succesfully" });
};

export const login = async (req, res, next) => {
  // Capturing user input by assigning it to variables
  const { email, password } = req.body;

  // Checking for empty inputs
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    // Find user from database by the email
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  // Handle case where no value was returned
  if (!existingUser) {
    return res.status(404).json({ message: "Unable to find user" });
  }

  // Check if password is correct
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  // Handle case where password is incorrect
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password Incorrect" });
  }

  // Return message that login was succesfull along with neccesseary creditentials of the user
  return res.status(200).json({
    message: "Login Succesfull",
    id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
  });
};

export const getBookingsOfUser = async (req, res, next) => {
  // Extracting user ID from request parameters
  const id = req.params.id;
  let bookings;

  try {
    // Find Booking by user id provided in request parameters and Use populate to get additional details from the referenced Movie model
    bookings = await Booking.find({ user: id }).populate("movie");
  } catch (err) {
    return console.log(err);
  }

  // Handle case where no booking was found
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

  // Respond with the transformed bookings array
  return res.status(200).json({ bookings: transformedBookings });
};
