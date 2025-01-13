import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { Footer, Header } from "./Layout";
import HomePage from "../Pages/Home";
import { Route, Routes } from "react-router-dom";
import {  MenuItemDetails, NotFound } from "./Page/MenuItems";


function App() {
  return (
    <div className="text-success">
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/shoppingCart" element={<NotFound />}></Route>
          <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails />}></Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
