import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '@/utils/auth';
import { TChallenge, TCreateForm, TEditForm } from '@/types';

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

      return headers;
    },
  }),
  tagTypes: ['Actual'],

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
        url: 'challenges/in-progress/?limit=100',
        method: 'GET',
      }),
      providesTags: ['Actual'],
    }),
    // GET challenge by id
    getChallengeByID: builder.query<TChallenge, Partial<ResponseUser>>({
      query: ({ uuid }) => ({
        url: `challenges/${uuid}`,
        method: 'GET',
      }),
      providesTags: ['Actual'],
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
    editChallenge: builder.mutation<TEditForm, Partial<ResponseUser>>({
      query: ({ uuid, dataEdit }) => ({
        url: `challenges/${uuid}`,
        method: 'PATCH',
        body: dataEdit,
      }),
      invalidatesTags: ['Actual'],
    }),
  }),
});
export const {
  useGetAllChallengeListQuery,
  useCreateChallengeMutation,
  useEditChallengeMutation,
  useGetChallengeByIDQuery,
} = contentApi;
