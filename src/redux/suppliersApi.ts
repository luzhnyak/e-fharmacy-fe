import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Supplier } from '../types';

import { baseQueryWithReauth } from './common/baseQueryWithReauth';

export const suppliersApi = createApi({
  reducerPath: 'suppliersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Suppliers', 'Suppliers'],
  endpoints: builder => ({
    getSuppliers: builder.query<ApiResponse<Supplier[]>, void>({
      query: () => `/api/suppliers`,
      providesTags: ['Suppliers'],
    }),
    getSupplierById: builder.query<ApiResponse<Supplier>, string>({
      query: id => `/api/suppliers/${id}`,
      providesTags: ['Suppliers'],
    }),
  }),
});

export const { useGetSuppliersQuery, useGetSupplierByIdQuery } = suppliersApi;
