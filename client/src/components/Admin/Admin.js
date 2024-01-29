import React from "react";
import AuthForm from "../Auth/AuthForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";

const Admin = () => {
  const getData = (data) => {
    console.log(data);
    sendAdminAuthRequest(data.inputs)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
