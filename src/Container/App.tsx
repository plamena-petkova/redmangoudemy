import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { Footer, Header } from "./Layout";
import HomePage from "../Pages/Home";
import { Route, Routes } from "react-router-dom";
import { MenuItemDetails } from "./Page/MenuItems";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { useEffect } from "react";
import { setShoppingCart } from "../Store/Redux/shoppingCartSlice";
import ShoppingCart from "./Page/ShoppingCart";
import Login from "./Page/Login";
import Register from "./Page/Register";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Interfaces/UserModel";
import { setLoggedInUser } from "../Store/Redux/userAuthSlice";
import AuthenticationTest from "./Page/AuthenticationTest";
import AuthenticationTestAdmin from "./Page/AuthenticationTestAdmin";
import AccessDenied from "./Page/AccessDenied";
import { RootStore } from "../Store/Redux/store";
import Payment from "./Page/Payment";
import OrderConfirm from "./Page/OrderConfirm";

function App() {
  const dispatch = useDispatch();

  const userData: UserModel = useSelector(
    (state: RootStore) => state.userAuthStore
  );

  const { data, isLoading } = useGetShoppingCartQuery(userData.id);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: UserModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <div className="text-success">
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/order/orderConfirmed/:id" element={<OrderConfirm />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
