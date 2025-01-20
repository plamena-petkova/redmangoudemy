import { MenuItemModel } from "./menuItemModel";

export interface OrderDetails {
    orderDetailId: number;
    orderHeaderId: number;
    menuItemId: number;
    menuItem: MenuItemModel;
    quantity: number;
    itemName: string;
    price: number;
  }
