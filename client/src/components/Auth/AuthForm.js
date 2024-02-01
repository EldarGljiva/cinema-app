import React, { useState } from "react";
import {
  Box,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const AuthForm = ({ onSubmit, isAdmin }) => {
  // State to track whether it's a login or registration form
  const [isLogin, setIsLogin] = useState(true);
  // State to store form input values
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Function to toggle between login and registration forms
  const handleToggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    setIsRegister((prevIsRegister) => !prevIsRegister);
  };
  const [isRegister, setIsRegister] = useState(false);
  // Function to handle input changes and update the state
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // e.target.value is the actual value we type in the input field
    }));
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    onSubmit({ inputs, register: isAdmin ? false : isRegister });
    setOpenSnackbar(true);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CancelIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isLogin ? "Login" : "Register"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          padding={5}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          minWidth={400}
          margin="auto"
          alignItems="stretch"
        >
          {!isAdmin && !isLogin && (
            <Box
              sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}
            >
              <FormLabel sx={{ mt: 1 }}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                variant="standard"
                type="text"
                name="name"
              />
            </Box>
          )}

          <FormLabel sx={{ mt: 1 }}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            variant="standard"
            type={"email"}
            name="email"
          />
          <FormLabel sx={{ mt: 1 }}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant="standard"
            type={"password"}
            name="password"
          />

          <Button
            sx={{
              mt: 2,
              borderRadius: 10,
              bgcolor: isLogin ? "#65c265" : "#f0f0f0",
              color: isLogin ? "#fff" : "#000",
              border: isLogin ? "none" : "1px solid #95b9db",
              ":hover": {
                bgcolor: isLogin ? "#7cd67c" : "",
                borderColor: isLogin ? "transparent" : "#6586a6",
              },
            }}
            type="submit"
            fullWidth
            variant={isLogin ? "contained" : "outlined"}
          >
            {isLogin ? "Login" : "Register"}
          </Button>

          {!isAdmin && (
            <Button
              sx={{ mt: 2, borderRadius: 10 }}
              type="button"
              fullWidth
              onClick={handleToggleForm}
            >
              {isLogin ? "Switch to Register" : "Switch to Login"}
            </Button>
          )}
        </Box>
      </form>
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
          Registered Succesfully!
        </MuiAlert>
      </Snackbar>
    </Dialog>
  );
};

export default AuthForm;
