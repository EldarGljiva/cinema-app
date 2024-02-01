import React, { Fragment, useEffect, useState } from "react";
import { deleteBooking, getUserBookings } from "../../api-helpers/api-helpers";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  List,
  ListItem,
  Typography,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserBookings();
        setBookings(data.bookings);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Box width={"100%"} display="flex">
        <Box width={"30%"} flexDirection="column" padding={5}>
          <AccountCircleIcon sx={{ fontSize: "10rem" }} />
          <Box
            padding={1}
            marginTop={1}
            border={"1px solid black"}
            borderRadius={50}
            width={"250px"}
            textAlign={"center"}
          >
            Name: {localStorage.getItem("userName")}
          </Box>
          <Box
            padding={1}
            marginTop={1}
            border={"1px solid black"}
            borderRadius={50}
            width={"250px"}
            textAlign={"center"}
          >
            Email: {localStorage.getItem("userEmail")}
          </Box>
        </Box>
        <Box width={"70%"} flexDirection="column" justifyContent="center">
          <Typography
            textAlign={"center"}
            fontWeight={"bold"}
            fontSize={"2rem"}
            margin={3}
          >
            My Bookings
          </Typography>
          <List>
            {bookings && (
              <Fragment>
                {/* Displaying booking details */}
                {bookings.map((booking, index) => (
                  <Box display={"inline-block"} margin={1}>
                    <ListItem
                      sx={{
                        padding: 2,
                        border: "1px solid black",
                        marginTop: 2,
                        display: "inline-block",
                        width: 250,
                      }}
                    >
                      <ListItemText>
                        Date: {new Date(booking.date).toLocaleDateString()}
                      </ListItemText>
                      <ListItemText>
                        Seat Number: {booking.seatNumber}
                      </ListItemText>
                      <ListItemText>
                        Movie Name: {booking.movieName}
                      </ListItemText>
                      <IconButton
                        onClick={() => handleDelete(booking._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  </Box>
                ))}
              </Fragment>
            )}
          </List>
        </Box>
      </Box>
    </div>
  );
};

export default UserProfile;
