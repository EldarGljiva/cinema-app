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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#232946" }}>
      <Toolbar>
        <Box width={"50%"} margin={"auto"} padding={2}>
          <Autocomplete
            onChange={handleChange}
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
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                <Tab LinkComponent={Link} to="/auth" label="Auth" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/user" label="Profile" />
                <Tab
                  onClick={() => logout(false)} //to not call a function we do callback
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/add_movie" label="Add Movie" />
                <Tab LinkComponent={Link} to="/admin_profile" label="Profile" />
                <Tab
                  onClick={() => logout(true)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
