import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Order } from '../types';

import { baseQueryWithReauth } from './common/baseQueryWithReauth';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Orders', 'Order'],
  endpoints: builder => ({
    getOrders: builder.query<ApiResponse<Order[]>, void>({
      query: () => `/api/orders`,
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<ApiResponse<Order>, string>({
      query: id => `/api/orders/${id}`,
      providesTags: ['Order'],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = ordersApi;
