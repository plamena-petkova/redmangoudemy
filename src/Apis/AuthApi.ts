import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redmangoapi.azurewebsites.net/api",
  }),
  tagTypes: ["ShoppingCarts"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userCredentials) => ({
        url: "auth/register",
        method: "POST",
        header: {
          "Content-type": "application/json",
        },
        body: userCredentials,
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "auth/login",
        method: "POST",
        header: {
          "Content-type": "application/json",
        },
        body: userData,
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } =
  authApi;
export default authApi;
