import { ShoppingCartModel } from "../../../Interfaces";

export default interface orderSummaryProps {
  data: {
    id: number;
    cartItems: ShoppingCartModel[];
    cartTotal: number;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
