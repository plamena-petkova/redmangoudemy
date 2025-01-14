import { useState } from "react";
import inputHelper from "../../Helpers/inputHelper";
import { apiResponse } from "../../Interfaces";
import { useLoginUserMutation } from "../../Apis/AuthApi";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../../Interfaces/UserModel";
import { setLoggedInUser } from "../../Store/Redux/userAuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "./Common";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });

  const [loginUser] = useLoginUserMutation();

  const handleUSerSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userData);
    setUserData(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await loginUser({
      userName: userData.userName,
      password: userData.password,
    });
    if (response.data) {
      const { token } = response.data.result;
      localStorage.setItem("token", token);
      const { fullName, id, email, role }: UserModel = jwtDecode(token);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
      navigate("/");
    } else if (response.error) {
      setError(response.error.data.errorMessages[0]);
    }

    setLoading(false);
  };
  return (
    <div className="container text-center">
      {loading && <MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              name="userName"
              placeholder="Enter Username"
              required
              value={userData.userName}
              onChange={handleUSerSubmit}
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter Password"
              required
              value={userData.password}
              onChange={handleUSerSubmit}
            />
            {error ? <p className="text-danger">{error}</p> : null}
          </div>
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
