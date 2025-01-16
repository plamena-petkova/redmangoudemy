import React from "react";
import withAdminAuth from "../../HoC/withAdminAuth";

const AuthenticationTestAdmin = () => {
  return (
    <div>
      The page can only be acccessed if role of logged in user is admin!
    </div>
  );
};

export default withAdminAuth(AuthenticationTestAdmin);
