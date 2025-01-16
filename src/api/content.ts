import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { IChallenge } from '@/types';

interface AddChallenge {
  description: string;
  goal: number;
  period: string;
  started_at: string;
  finished_at: string;
}
interface ResponseUser {
  dataAdd: AddChallenge;
  status: number;
  telegramId: string;
}

export const contentApi = createApi({
  reducerPath: 'contentApi',
  //keepUnusedDataFor: 1200,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://193.164.150.86:8098/',
  }),
  tagTypes: ['Actual'],

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
        url: '/challenges/in-progress/?limit=100',
        method: 'GET',
        headers: {
          Authorization: telegramId,
        },
      }),
      providesTags: ['Actual'],
    }),

    //------------   POST   ------------

    //add new token in user's wallet
    createChallenge: builder.mutation<AddChallenge, Partial<ResponseUser>>({
      query: ({ dataAdd, telegramId }) => ({
        url: `challenges/`,
        method: 'POST',
        body: dataAdd,
        headers: {
          Authorization: telegramId,
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Actual'],
    }),
  }),
});
export const { useGetAllChallengeListQuery, useCreateChallengeMutation } = contentApi;
