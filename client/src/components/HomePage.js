import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, Button, Slider } from "@mui/material";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Carousel } from "./Carousel.jsx";
import slides from "./data/carouselData.json";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  console.log(movies);
  return (
    <Box
      width={"100%"}
      minHeight="100vh"
      margin="auto"
      sx={{ backgroundColor: "#232122" }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        margin="auto"
        width="100%"
        height="100%"
        padding={2}
      >
        <Carousel data={slides.slides}></Carousel>
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"} color={"#e07b9c"}>
          Latest Release
        </Typography>
      </Box>
      <Box width="100%" height="100%" margin="auto" marginTop={2}>
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          flexWrap="wrap"
        >
          {movies &&
            movies
              .slice(0, 4)
              .map((movie, index) => (
                <MovieItem
                  id={movie._id}
                  title={movie.title}
                  posterUrl={movie.posterUrl}
                  releaseDate={movie.releaseDate}
                  key={index}
                />
              ))}
        </Box>
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="contained"
          sx={{
            margin: "auto",
            bgcolor: "#c91c55",
            color: "#fff",
            ":hover": { bgcolor: "#d62f66" },
          }}
        >
          View all movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
