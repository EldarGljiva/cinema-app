import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import Typography from "@mui/material/Typography";
import { Box, Button, FormLabel, TextField } from "@mui/material";

const Booking = () => {
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
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  // If id changes run useEffect
  console.log(movie);
  return (
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fanatasy"
            variant="h4"
            textAlign="center"
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
            >
              <img
                width="80%"
                height={"300px"}
                src={movie.posterUrl}
                alt={movie.title}
              />
              <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight="bold" marginTop={1}>
                  {new Date(movie.releaseDate).toDateString()}
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
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    name="seatNumber"
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    value={inputs.date}
                    onChange={handleChange}
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
