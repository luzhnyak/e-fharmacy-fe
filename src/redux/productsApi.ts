import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse, CreateProduct, Product } from '../types';

import { baseQueryWithReauth } from './common/baseQueryWithReauth';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products', 'Product'],
  endpoints: builder => ({
    getProducts: builder.query<ApiResponse<Product[]>, void>({
      query: () => `/api/products`,
      providesTags: ['Products'],
    }),
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: id => `/api/products/${id}`,
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<ApiResponse<Product>, CreateProduct>({
      query: data => {
        return {
          url: '/api/products',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<
      ApiResponse<Product>,
      { id: number; data: Product }
    >({
      query: ({ id, data }) => {
        return {
          url: `/api/products/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Products', 'Product'],
    }),
    deleteProduct: builder.mutation<ApiResponse<Product>, number>({
      query: id => {
        return {
          url: `/api/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
