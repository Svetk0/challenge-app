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
      headers.set('Content-Type', 'application/json');
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
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Accept: 'application/json',
        //     'X-CSRFTOKEN': 'BRXTMy4liQAgmC7I1V52MT3VxhpQ1YbflDGiryyWhNdCrLUFQCkLtj4cGG0d9ijy',
        //   },
        //   'x-requested-with': 'XMLHttpRequest',
        //   'user-agent':
        //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
