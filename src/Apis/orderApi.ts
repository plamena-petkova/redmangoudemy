import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redmangoapi.azurewebsites.net/api",
  }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "order",
        method:'POST',
        body:orderDetails
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
export default orderApi;
