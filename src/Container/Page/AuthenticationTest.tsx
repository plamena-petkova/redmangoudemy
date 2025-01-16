import React from "react";
import withAuth from "../../HoC/withAuth";

const AuthenticationTest = () => {
  return <div>The page cannot be accessed by any logged in user.</div>;
};

export default withAuth(AuthenticationTest);
