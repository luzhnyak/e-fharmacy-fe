import { createSlice } from '@reduxjs/toolkit';

export type User = {
  id: number | null;
  name: string;
  email: string;
};

export type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
  user: User;
};

const initialState: AuthState = {
  token: null,
  isLoggedIn: true,
  user: {
    id: null,
    name: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      state.token = action.payload.token || state.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    resetAuthData: state => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = initialState.user;
    },
  },
});

export const { resetAuthData, saveAuthData } = authSlice.actions;
export const authReducer = authSlice.reducer;
