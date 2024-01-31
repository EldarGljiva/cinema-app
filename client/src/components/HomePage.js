import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  console.log(movies);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height={"100%"} padding={2}>
        <img
          src="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
          alt="Not defined yet"
          width={"100%"}
          height={"100%"}
        ></img>
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
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
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View all movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
