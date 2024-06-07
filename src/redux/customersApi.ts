import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Customer } from '../types';

import { baseQueryWithReauth } from './common/baseQueryWithReauth';

export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Customers', 'Customer'],
  endpoints: builder => ({
    getCustomers: builder.query<ApiResponse<Customer[]>, void>({
      query: () => `/api/customers`,
      providesTags: ['Customer'],
    }),
    getCustomerById: builder.query<ApiResponse<Customer>, string>({
      query: id => `/api/customers/${id}`,
      providesTags: ['Customer'],
    }),
  }),
});

export const { useGetCustomersQuery, useGetCustomerByIdQuery } = customersApi;
