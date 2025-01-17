import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import OrderSummary from "./Order/OrderSummary";
import toastNotify from "../../Helpers/toastNotify";
import { apiResponse, CartItemModel } from "../../Interfaces";
import { usePlaceOrderMutation } from "../../Apis/orderApi";
import orderSummaryProps from "./Order/orderSummaryProps";


const CheckoutForm = ({ data, userInput }: orderSummaryProps) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isProcessing, setIsProcessing] = useState(false);
  const [placeOrder] = usePlaceOrderMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occured", "error");
      setIsProcessing(false);
    } else {
      let grandTotal = 0;
      let totalItems = 0;

      console.log("UserInput", userInput);

      const orderDetailsDTO: any = [];
      data.cartItems.forEach((item: CartItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["menuItemId"] = item.menuItem?.id;
        tempOrderDetail["quantity"] = item.quantity;
        tempOrderDetail["itemName"] = item.menuItem?.name;
        tempOrderDetail["price"] = item.menuItem?.price;
        orderDetailsDTO.push(tempOrderDetail);
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity;
      });
      const response: apiResponse = await placeOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        totalItems: totalItems,
        orderTotal: grandTotal,
        orderDetailsDTO: orderDetailsDTO,
        stripePaymentIntentId: data.stripePaymentIntentId,
        applicationUserId: data.userId,
        status:
          result.paymentIntent.status === "succeeded" ? "confirmed" : "pending",
      });

      if (response.data?.result.status === "confirmed") {
        navigate(`/order/OrderConfirmed/${response.data.result.orderHeaderId}`);
      } else {
        navigate("/failed");
      }
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100" disabled={!stripe || isProcessing}>
        Submit
      </button>
    </form>
  );
};

const Payment = () => {
  const {
    state: { apiResult, userInput },
  } = useLocation();
  console.log(apiResult, userInput);
  const stripePromise = loadStripe(
    "pk_test_51MG6xmDU3OjDrP4GJV8avgtFNNGxikOffHWtYgncDFkahat38KLX3foPPgFbk0JHNG2FmYhIpSNl2lqbnR3uEfRM00Bv0LptTW"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };
  // apiResult={apiResult} userInput={userInput}
  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container m-5 p-5">
        <div className="row">
          <div className="col-md-7">
            {" "}
            <OrderSummary data={apiResult} userInput={userInput} />
          </div>
          <div className="col-md-4 offset-md-1">
            <h3 className="text-success">Payment</h3>
            <div className="mt-5">
              <CheckoutForm data={apiResult} userInput={userInput} />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
