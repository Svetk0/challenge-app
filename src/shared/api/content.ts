import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '@/shared/utils/auth';
import { TChallenge, TStatistics, TCreateForm, TEditForm } from '@/shared/types';

interface ResponseUser {
  id: number;
  uuid: string;
  dataEdit: TEditForm;
  dataAdd: TCreateForm;
  status: number;
  telegramId: string;
}

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://challenge-app.site/api/',
    prepareHeaders: (headers) => {
      const token = getAuthToken();

      if (token) {
        headers.set('Authorization', token);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Actual', 'Finished'],

  endpoints: (builder) => ({
    //------------   GETS   ------------
    //user info
    getUserMe: builder.query({
      query: () => ({
        url: 'users/me/',
        method: 'GET',
      }),
    }),

    // GET list of user's challenges
    getAllChallengeList: builder.query<TChallenge[], void>({
      query: () => ({
        url: 'challenges/in-progress/?limit=100/',
        method: 'GET',
      }),
      providesTags: ['Actual'],
    }),
    // GET list of user's FINISHED challenges
    getAllFinishedChallengeList: builder.query<TChallenge[], void>({
      query: () => ({
        url: 'challenges/finished/?limit=100/',
        method: 'GET',
      }),
      providesTags: ['Finished'],
    }),
    // GET challenge by id
    getChallengeByID: builder.query<TChallenge, Partial<ResponseUser>>({
      query: ({ uuid }) => ({
        url: `challenges/${uuid}/`,
        method: 'GET',
      }),
      providesTags: ['Actual', 'Finished'],
    }),
    // Get overall statistics data
    getOverallStatistics: builder.query<TStatistics, void>({
      query: () => ({
        url: 'statistics/common/',
        method: 'GET',
      }),
      providesTags: ['Actual', 'Finished'],
    }),

    //------------   MUTATIONS   ------------

    //add new challenge
    createChallenge: builder.mutation<TCreateForm, Partial<ResponseUser>>({
      query: ({ dataAdd }) => ({
        url: `challenges/`,
        method: 'POST',
        body: dataAdd,
      }),
      invalidatesTags: ['Actual'],
    }),

    //edit challenge by id
    editChallenge: builder.mutation<
      Partial<TEditForm>,
      { uuid: string; dataEdit: Partial<TEditForm> }
    >({
      query: ({ uuid, dataEdit }) => ({
        url: `challenges/${uuid}/`,
        method: 'PATCH',
        body: dataEdit,
      }),
      invalidatesTags: ['Actual', 'Finished'],
    }),
    //delete challenge by id
    deleteChallenge: builder.mutation<TEditForm, Partial<ResponseUser>>({
      query: ({ uuid }) => ({
        url: `challenges/${uuid}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Actual', 'Finished'],
    }),
  }),
});
export const {
  useGetAllChallengeListQuery,
  useGetAllFinishedChallengeListQuery,
  useGetChallengeByIDQuery,
  useGetOverallStatisticsQuery,
  useCreateChallengeMutation,
  useEditChallengeMutation,
  useDeleteChallengeMutation,
} = contentApi;
