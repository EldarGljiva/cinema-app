import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import Typography from "@mui/material/Typography";
import { Box, Button, FormLabel, TextField, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Booking = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleErrorSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackbar(false);
  };
  // State to store the movie details
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  // Get the 'id' parameter from the URL using useParams
  const id = useParams().id;
  console.log(id);
  // useEffect to fetch movie details when 'id' changes
  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        if (res && res.movie) {
          setMovie(res.movie);
        } else {
          console.error("Invalid response structure. Movie details not found.");
        }
      })
      .catch((err) => console.log(err));
  }, [id]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    if (!inputs.seatNumber || !inputs.date) {
      setOpenErrorSnackbar(true);
      return;
    }

    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setOpenSnackbar(true);
  };
  // If id changes run useEffect
  console.log(movie);
  return (
    <div style={{ backgroundColor: "#232122" }}>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fanatasy"
            variant="h4"
            textAlign="center"
            color={"#c91c55"}
          >
            Book Tickets of Movie: {movie.title}
          </Typography>
          <Box display="flex" justifyContent={"center"}>
            <Box
              display="flex"
              justifyContent={"column"}
              flexDirection={"column"}
              paddingTop={3}
              width={"50%"}
              marginRight={"auto"}
              marginLeft={"20px"}
            >
              <img
                width="80%"
                height={"500px"}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography color={"#fff"} paddingTop={2}>
                  {movie.description}
                </Typography>
              </Box>
            </Box>
            <Box width={"50%"} paddingTop={3}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <FormLabel sx={{ color: "#fff" }}>Seat Number</FormLabel>
                  <TextField
                    InputProps={{
                      style: { color: "#666" },
                    }}
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    name="seatNumber"
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  />
                  <FormLabel sx={{ color: "#fff" }}>Booking Date</FormLabel>
                  <TextField
                    InputProps={{
                      style: { color: "#666" },
                    }}
                    value={inputs.date}
                    onChange={handleChange}
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                  />
                  <Button
                    type="submit"
                    sx={{
                      width: "150px",
                      margin: "0 auto",
                      bgcolor: "#c91c55",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#d62f66",
                      },
                    }}
                    variant="contained"
                  >
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={4000}
        onClose={handleErrorSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleErrorSnackbarClose}
          severity="error"
        >
          Missing Input Fields
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Movie successfully added!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Booking;
