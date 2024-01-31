import React from "react";
import AuthForm from "./AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log("Response data:", data);

    // Check if the response has both 'id' and 'token' properties
    if (data && data.id && data.token) {
      console.log("Received admin id:", data.id);
      localStorage.setItem("token", JSON.stringify(data.token));

      dispatch(adminActions.login());

      // Store 'id' and 'token' in local storage
      localStorage.setItem("adminId", data.id);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      console.error("Invalid response structure. 'id' or 'token' not found.");
    }
  };
  const getData = (data) => {
    console.log(data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
