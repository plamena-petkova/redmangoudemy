import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { Footer, Header } from "./Layout";
import HomePage from "../Pages/Home";
import { Route, Routes } from "react-router-dom";
import { MenuItemDetails } from "./Page/MenuItems";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { useEffect } from "react";
import { setShoppingCart } from "../Store/Redux/shoppingCartSlice";
import ShoppingCart from "./Page/ShoppingCart";
import Login from "./Page/Login";
import Register from "./Page/Register";

function App() {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery(
    "8402373c-a5a4-4218-8d5b-c22c5f9b6503"
  );

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
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
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
