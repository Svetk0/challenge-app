import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const contentApi = createApi({
  reducerPath: "contentApi",
  //keepUnusedDataFor: 1200,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bazar-bridge.5dhub.tech/api/v1/",
  }),
  tagTypes: ["TokenBalance", "UserTokenList"],

  endpoints: (builder) => ({
    //------------   GET   ------------

    //user info
    getUserMe: builder.query({
      query: (telegramId: string) => ({
        url: "users/me/",
        method: "GET",
        headers: {
          Authorization: telegramId,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetUserMeQuery } = contentApi;
