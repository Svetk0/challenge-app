import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { IChallenge } from '@/types';
interface User {
  //id?: number;
  telegram_id: string | null | number;
  username: string | null;
  first_name: string;
  last_name: string;
  email: string;
  //photo?: null;
}
interface AddToken {
  token_name: string;
}
interface SendToken {
  sender: string;
  receiver: string;
  amount: string;
  send_commission?: number;
}
interface ResponseUser {
  data: User;
  dataSend: SendToken;
  dataAdd: AddToken;
  status: number;
  telegramId: string;
  token_name: string;
}

export const contentApi = createApi({
  reducerPath: 'contentApi',
  //keepUnusedDataFor: 1200,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://193.164.150.86:8098/',
  }),
  tagTypes: ['TokenBalance', 'UserTokenList'],

  endpoints: (builder) => ({
    //------------   GET   ------------

    //user info
    getUserMe: builder.query({
      query: (telegramId: string) => ({
        url: 'users/me/',
        method: 'GET',
        headers: {
          Authorization: telegramId,
          'Content-Type': 'application/json',
        },
      }),
    }),

    //Get list of user's challenges
    getAllChallengeList: builder.query({
      query: (telegramId: string) => ({
        url: 'challenges/?limit=100',
        method: 'GET',
        headers: {
          Authorization: telegramId,
        },
      }),
    }),

    //------------   POST   ------------
    //create user (Registration)
    createUser: builder.mutation<ResponseUser, Partial<User>>({
      query: (data) => ({
        url: `users/`,
        method: 'POST',
        body: data,
        headers: {
          'content-type': 'application/json',
        },
      }),
    }),

    sendToken: builder.mutation<SendToken, Partial<ResponseUser>>({
      query: ({ dataSend, telegramId }) => ({
        url: `send/`,
        method: 'POST',
        body: dataSend,
        headers: {
          Authorization: telegramId,
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['TokenBalance', 'UserTokenList'],
    }),

    //add new token in user's wallet
    addToken: builder.mutation<AddToken, Partial<ResponseUser>>({
      query: ({ dataAdd, telegramId }) => ({
        url: `wallets/`,
        method: 'POST',
        body: dataAdd,
        headers: {
          Authorization: telegramId,
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['UserTokenList'],
    }),

    //-------   WILL BE REMOVED -------
    //for development process
    getAllUsers: builder.query({
      query: () => ({
        url: 'users/',
        method: 'GET',
      }),
    }),
  }),
});
export const { useGetAllChallengeListQuery } = contentApi;
