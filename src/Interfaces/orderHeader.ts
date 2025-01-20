import { OrderDetails } from "./OrderDetailsModel";

export default interface OrderHeader {
    orderHeaderId?: number;
    pickupName?: string;
    pickupPhoneNumber?: string;
    pickupEmail: string;
    applicationUserId: string;
    user?: unknown;
    orderTotal: number;
    orderDate: string;
    stripePaymentIntentID: string;
    status?: string;
    totalItems?: number;
    orderDetails?: OrderDetails[];
  }