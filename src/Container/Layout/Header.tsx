import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/mango.png";
import { RootStore } from "../../Store/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CartItemModel } from "../../Interfaces";
import { UserModel } from "../../Interfaces/UserModel";
import {
  emptyUserState,
  setLoggedInUser,
} from "../../Store/Redux/userAuthSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore: CartItemModel[] = useSelector(
    (state: RootStore) => state.shoppingCartStore.cartItems ?? []
  );
  const userData: UserModel = useSelector(
    (state: RootStore) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark ">
      <div className="container-fluid">
        <NavLink className="nav-link" aria-current="page" to="/">
          <img src={logo} style={{ height: "40px" }} alt="logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to="/shoppingCart"
              >
                <i className="bi bi-cart"></i>
                {userData.id && `${shoppingCartFromStore?.length}`}
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin Panel
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <div className="d-flex" style={{ marginLeft: "auto" }}>
              {userData.id && (
                <>
                  <p className="text-success text-center m-2">
                    Welcome, {userData.fullName}
                  </p>
                  <li className="nav-item ">
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      style={{ border: "none", height: "40px", width: "100px" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!userData.id && (
                <>
                  {" "}
                  <li className="nav-item text-white">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item text-white">
                    <NavLink
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      style={{ border: "none", height: "40px", width: "100px" }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
