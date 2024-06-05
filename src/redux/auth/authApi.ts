import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';
import { productsApi } from '../products/productsApi';

import { resetAuthData, saveAuthData } from './authSlice';
import { User, LoginUser } from '../../types';

const apis = {
  productsApi,
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUserById: builder.query<{ data: User }, number>({
      query: id => ({
        url: `/api/users/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'Users', id }],
    }),
    refreshUser: builder.query<{ data: User }, void>({
      query: () => ({
        url: `/api/users/refresh`,
        method: 'GET',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(saveAuthData(data));
      },
    }),
    register: builder.mutation<User, User>({
      query: credentials => ({
        method: 'POST',
        url: '/api/users/register',
        body: credentials,
      }),
    }),
    login: builder.mutation<User, LoginUser>({
      query: credentials => ({
        method: 'POST',
        url: '/api/users/login',
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(saveAuthData(data));
      },
    }),
    logout: builder.query<User, void>({
      query: () => ({
        method: 'GET',
        url: '/api/users/logout',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(resetAuthData());
        Object.values(apis).forEach(api => dispatch(api.util.resetApiState()));
      },
    }),
  }),
});
