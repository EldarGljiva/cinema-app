import { Box } from "@mui/material";
import React from "react";
import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";

const Auth = () => {
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log("Response data:", data);

    // Check if the response has an 'id' property
    if (data && data.id) {
      console.log("Received user id:", data.id);
      dispatch(userActions.login());
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
    } else {
      console.error("Invalid response structure. 'id' not found.");
    }
  };

  const getData = (data) => {
    console.log(data);
    sendUserAuthRequest(data.inputs, data.register)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </Box>
  );
};

export default Auth;
