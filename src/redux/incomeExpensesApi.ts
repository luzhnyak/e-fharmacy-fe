import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse, IncomeExpense } from '../types';

import { baseQueryWithReauth } from './common/baseQueryWithReauth';

export const incomeExpensesApi = createApi({
  reducerPath: 'incomeExpensesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['IncomeExpenses', 'IncomeExpense'],
  endpoints: builder => ({
    getIncomeExpenses: builder.query<ApiResponse<IncomeExpense[]>, void>({
      query: () => `/api/income-expenses`,
      providesTags: ['IncomeExpenses'],
    }),
  }),
});

export const { useGetIncomeExpensesQuery } = incomeExpensesApi;
