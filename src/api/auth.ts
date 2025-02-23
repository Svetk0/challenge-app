import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TChallenge } from '@/shared/types';

export const authApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://challenge-app.site/api/',
    prepareHeaders: (headers) => {
      const { initDataRaw: token } = retrieveLaunchParams();
      if (token) {
        headers.set('Authorization', `tma ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Actual'],

  endpoints: (builder) => ({
    //------------   GETS   ------------

    // GET list of user's challenges
    getAllChallengeList: builder.query<TChallenge[], void>({
      query: () => ({
        url: 'challenges/in-progress/?limit=100/',
        method: 'GET',
      }),
      providesTags: ['Actual'],
    }),

    getAuthTest: builder.query<string, void>({
      query: () => ({
        url: 'test-auth/',
        method: 'GET',
      }),
    }),
  }),
});
export const { useGetAllChallengeListQuery, useGetAuthTestQuery } = authApi;
