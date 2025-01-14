import CartItemModel from "./CartItemModel";

export default interface ShoppingCartModel {
  id: number;
  userId: string;
  cartItems: CartItemModel[];
  cartTotal: number;
  stripePaymentIntentId?: unknown;
  clientSecret?: unknown;
}
