import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseUrl = import.meta.env.VITE_BASE_URL || "https://edulab.pp.ua";
const isProd = import.meta.env.PROD;

import { saveAuthData, resetAuthData } from "../auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
  fetchFn: (input: RequestInfo, init?: RequestInit) => {
    return fetch(input, {
      ...init,
      credentials: isProd ? "include" : undefined,
    });
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 401 &&
    (result.error.data as { message?: string }).message ===
      "Access token has expired"
  ) {
    const refreshResult = await baseQuery(
      // для https -------------------
      // { method: 'GET', url: '/api/auth/refresh-user', credentials: 'include' },
      // ------------------------------
      {
        method: "GET",
        url: "/api/auth/refresh-user",
        credentials: isProd ? "include" : undefined,
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      api.dispatch(saveAuthData(refreshResult.data));

      return await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetAuthData());
    }
  } else if (
    result.error &&
    result.error.status === 401 &&
    (result.error.data as { message?: string }).message ===
      "Authentication failed"
  ) {
    api.dispatch(resetAuthData());
  }

  return result;
};
