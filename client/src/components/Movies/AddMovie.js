import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
import MuiAlert from "@mui/material/Alert";

const labelProps = {
  mt: 1,
  mb: 1,
};

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    addMovie({ ...inputs }).then((res) => console.log(res));
    setOpenSnackbar(true);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Box
          width={"100%"}
          padding={5}
          display={"flex"}
          flexDirection={"column"}
          margin={4}
          boxShadow={"10px 10px 20px #8f8f8f"}
          minWidth={300}
        >
          <Typography textAlign={"center"} variant="h5" marginBottom={4}>
            Add New Movie
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
          ></TextField>

          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
          ></TextField>

          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
          ></TextField>

          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            value={inputs.releaseDate}
            onChange={handleChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
          ></TextField>
          <Box marginBottom={2}>
            <FormLabel sx={labelProps}>Featured</FormLabel>
            <Checkbox
              name="featured"
              checked={inputs.featured}
              onClick={(e) =>
                setInputs((prevState) => ({
                  ...prevState,
                  featured: e.target.checked,
                }))
              }
              sx={{ mr: "auto" }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              margin: "auto",
              width: "50%",
              bgcolor: "#c91c55",
              ":hover": {
                bgcolor: "#121227",
              },
            }}
          >
            Add New Movie
          </Button>
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
          Movie successfully added!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AddMovie;
