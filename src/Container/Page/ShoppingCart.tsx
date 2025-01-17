/* eslint-disable react-refresh/only-export-components */
import withAuth from "../../HoC/withAuth";
import { CartPickupDetails, CartSummary } from "./Cart";

function ShoppingCart() {
  return (
    <div className="row w-100" style={{ marginTop: "10px" }}>
      <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
        <CartSummary />
      </div>
      <div className="col-lg-6 col-12 p-4"><CartPickupDetails /></div>
    </div>
  );
}

export default withAuth(ShoppingCart);
