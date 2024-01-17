// from other folders/files
import Booking from "../models/Booking.js";

// In your booking-controller.js
export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let booking;
  try {
    // Check if the provided date is a valid ISO string
    if (!Date.parse(date)) {
      throw new Error("Invalid date format");
    }

    booking = new Booking({
      movie,
      date: new Date(date),
      seatNumber,
      user,
    });

    booking = await booking.save();
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "Invalid date format or other error occurred" });
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};
