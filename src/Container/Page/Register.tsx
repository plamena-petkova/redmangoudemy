import { useState } from "react";
import inputHelper from "../../Helpers/inputHelper";
import { useRegisterUserMutation } from "../../Apis/AuthApi";
import { apiResponse } from "../../Interfaces";

function Register() {
  const [loading, setLoading] = useState<boolean>();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  });

  const [registerUser] = useRegisterUserMutation();

  const handleUSerSubmit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userData);
    setUserData(tempData);
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await registerUser({
      userName: userData.userName,
      password: userData.password,
      role: userData.role,
      name: userData.name,
    });
    if(response.data) {
      console.log(response.data);
    } else if(response.error) {
      console.log(response.error.data.errorMessages[0]);
    }

    setLoading(false);
  }

  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              name="userName"
              className="form-control"
              placeholder="Enter Username"
              required
              value={userData.userName}
              onChange={handleUSerSubmit}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              required
              value={userData.name}
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
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              name="role"
              required
              value={userData.role}
              onChange={handleUSerSubmit}
            >
              <option value="">--Select Role--</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
