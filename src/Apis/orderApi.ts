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
        method: "POST",
        body: orderDetails,
      }),
      invalidatesTags:['Orders']
    }),
    getAllOrders: builder.query({
      query: (userId) => ({
        url: "order",
        params: {
          userId: userId,
        },
      }),
      providesTags: ["Orders"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
} = orderApi;
export default orderApi;
