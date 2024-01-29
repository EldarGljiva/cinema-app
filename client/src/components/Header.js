import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Toolbar,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#232946" }}>
      <Toolbar>
        <Box width={"50%"} margin={"auto"} padding={2}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                {...params}
                label="Search a Movie"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            value={value}
            textColor="inherit"
            indicatorColor="secondary"
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/" label="Home" />
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            <Tab label="About" />
            <Tab label="Contact" />
            <Tab LinkComponent={Link} to="/admin" label="Admin" />
            <Tab LinkComponent={Link} to="/auth" label="Auth" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
