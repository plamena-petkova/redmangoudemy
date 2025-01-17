import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import OrderSummary from "./Order/OrderSummary";
import toastNotify from "../../Helpers/toastNotify";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

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
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occured", 'error')
      setIsProcessing(false)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100" disabled={!stripe}>Submit</button>
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
              <CheckoutForm />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
