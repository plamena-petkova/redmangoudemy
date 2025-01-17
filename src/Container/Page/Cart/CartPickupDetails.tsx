import { useSelector } from "react-redux";
import { apiResponse, CartItemModel } from "../../../Interfaces";
import { RootStore } from "../../../Store/Redux/store";
import { useState } from "react";
import inputHelper from "../../../Helpers/inputHelper";
import { MiniLoader } from "../Common";
import { UserModel } from "../../../Interfaces/UserModel";
import { useInitiatePaymentMutation } from "../../../Apis/paymentApi";
import { useNavigate } from "react-router-dom";

function CartPickupDetails() {
  const navigate = useNavigate();

  const shoppingCartFromStore: CartItemModel[] = useSelector(
    (state: RootStore) => state.shoppingCartStore.cartItems ?? []
  );
  const userData: UserModel = useSelector(
    (state: RootStore) => state.userAuthStore
  );
  const [loading, setLoading] = useState<boolean>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let grandTotal = 0;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let totalItems = 0;

  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
  };

  shoppingCartFromStore.map((cartItem: CartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });

  const [userInput, setUserInput] = useState(initialUserData);
  const [initiatePayment] = useInitiatePaymentMutation();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const {data}: apiResponse = await initiatePayment(userData.id);
    console.log(data);
    const orderSummary = {grandTotal, totalItems};
    navigate('/payment', {
      state:{apiResult:data?.result, userInput, orderSummary}
    })

    };

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form onSubmit={handleSubmit} className="col-10 mx-auto">
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            className="form-control"
            placeholder="name..."
            name="name"
            required
            value={userInput.name}
            onChange={handleUserInput}
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            className="form-control"
            placeholder="email..."
            name="email"
            required
            value={userInput.email}
            onChange={handleUserInput}
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            required
            value={userInput.phoneNumber}
            onChange={handleUserInput}
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>

        {loading ? (
          <MiniLoader />
        ) : (
          <button
            type="submit"
            className="btn btn-lg btn-success form-control mt-3"
            disabled={loading}
          >
            {" "}
            Looks Good? Place Order!
          </button>
        )}
      </form>
    </div>
  );
}

export default CartPickupDetails;
