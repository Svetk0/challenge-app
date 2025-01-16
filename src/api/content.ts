import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '@/utils/auth';
import { TChallenge, TCreateForm } from '@/types';

interface ResponseUser {
  dataAdd: TCreateForm;
  status: number;
  telegramId: string;
}

export const contentApi = createApi({
  reducerPath: 'contentApi',
  //keepUnusedDataFor: 1200,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://193.164.150.86:8098/',
    prepareHeaders: (headers) => {
      const token = getAuthToken();

      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),
  tagTypes: ['Actual'],

  endpoints: (builder) => ({
    //------------   GET   ------------
    //user info
    getUserMe: builder.query({
      query: () => ({
        url: 'users/me/',
        method: 'GET',
      }),
    }),

    //Get list of user's challenges
    getAllChallengeList: builder.query<TChallenge[], void>({
      query: () => ({
        url: '/challenges/in-progress/?limit=100',
        method: 'GET',
      }),
      providesTags: ['Actual'],
    }),

    //------------   POST   ------------

    //add new token in user's wallet
    createChallenge: builder.mutation<TCreateForm, Partial<ResponseUser>>({
      query: ({ dataAdd }) => ({
        url: `challenges/`,
        method: 'POST',
        body: dataAdd,
      }),
      invalidatesTags: ['Actual'],
    }),
  }),
});
export const { useGetAllChallengeListQuery, useCreateChallengeMutation } = contentApi;
