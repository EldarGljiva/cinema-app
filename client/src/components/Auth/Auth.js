import { Box } from "@mui/material";
import React from "react";
import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";

const Auth = () => {
  const getData = (data) => {
    console.log(data);

    sendUserAuthRequest(data.inputs, data.register)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </Box>
  );
};

export default Auth;
