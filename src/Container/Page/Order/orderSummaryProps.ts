import { ShoppingCartModel } from "../../../Interfaces";

export default interface orderSummaryProps {
  data: {
    id: number;
    cartItems: ShoppingCartModel[];
    cartTotal: number;
    userId:string;
    stripePaymentIntentId:string;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
