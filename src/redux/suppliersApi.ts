import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse, CreateSupplier, Supplier } from '../types';

import { baseQueryWithReauth } from './common/baseQueryWithReauth';

export const suppliersApi = createApi({
  reducerPath: 'suppliersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Suppliers', 'Supplier'],
  endpoints: builder => ({
    getSuppliers: builder.query<ApiResponse<Supplier[]>, void>({
      query: () => `/api/suppliers`,
      providesTags: ['Suppliers'],
    }),
    getSupplierById: builder.query<ApiResponse<Supplier>, string>({
      query: id => `/api/suppliers/${id}`,
      providesTags: ['Suppliers'],
    }),
    createSupplier: builder.mutation<ApiResponse<Supplier>, CreateSupplier>({
      query: data => {
        return {
          url: '/api/suppliers',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Suppliers'],
    }),
    updateSupplier: builder.mutation<
      ApiResponse<Supplier>,
      { id: number; data: CreateSupplier }
    >({
      query: ({ id, data }) => {
        return {
          url: `/api/suppliers/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Suppliers', 'Supplier'],
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} = suppliersApi;
