import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { menuItemApi } from "../../Apis";
import {shoppingCartApi} from "../../Apis";
import { shoppingCartReducer } from "./shoppingCartSlice";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore:shoppingCartReducer,
  
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuItemApi.middleware).concat(shoppingCartApi.middleware),
});

export type RootStore = ReturnType<typeof store.getState>;

export default store;
