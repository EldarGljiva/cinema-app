import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Toolbar,
  TextField,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

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
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2e2b2d" }}>
      <Toolbar>
        <Box width={"20%"}>
          <Link to="/">
            <img src="/popcorn.png" alt="logo" width="60px" height="50px" />
          </Link>
        </Box>
        <Box width={"50%"} margin={"auto"} padding={2}>
          <Autocomplete
            sx={{ bgcolor: "#171717" }}
            onChange={handleChange}
            id="free-solo-demo"
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  input: { color: "white" },
                  "& .MuiInputLabel-root": { color: "#666" },
                }}
                {...params}
                label="Search a Movie"
              />
            )}
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <Tabs
            value={value}
            textColor="inherit"
            className="custom-tabs"
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/" label="Home" />
            <Tab LinkComponent={Link} to="/movies" label="Movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                <Tab LinkComponent={Link} to="/auth" label="Login" />
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
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          sx={{ marginTop: 4 }}
        >
          <MenuItem
            component={Link}
            to="/"
            selected={value === 0}
            onClick={() => {
              setValue(0);
              handleMenuClose();
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            component={Link}
            to="/movies"
            selected={value === 0}
            onClick={() => {
              setValue(0);
              handleMenuClose();
            }}
          >
            Movies
          </MenuItem>

          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <MenuItem
                component={Link}
                to="/admin"
                selected={value === 0}
                onClick={() => {
                  setValue(0);
                  handleMenuClose();
                }}
              >
                Admin
              </MenuItem>

              <MenuItem
                component={Link}
                to="/auth"
                selected={value === 0}
                onClick={() => {
                  setValue(0);
                  handleMenuClose();
                }}
              >
                Login
              </MenuItem>
            </>
          )}

          {isUserLoggedIn && (
            <>
              <MenuItem
                component={Link}
                to="/user"
                selected={value === 0}
                onClick={() => {
                  setValue(0);
                  handleMenuClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                component={Link}
                to="/"
                selected={value === 0}
                onClick={() => {
                  setValue(0);
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </>
          )}
          {isAdminLoggedIn && (
            <>
              <MenuItem
                component={Link}
                to="/add_movie"
                selected={value === 0}
                onClick={() => {
                  setValue(0);
                  handleMenuClose();
                }}
              >
                Add Movie
              </MenuItem>
              <MenuItem
                component={Link}
                to="/"
                selected={value === 0}
                onClick={() => {
                  setValue(0);
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
