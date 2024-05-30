import { RootState } from '../store';

export const authSelectors = {
  getUser: (state: RootState) => state.auth.user,
  getUserId: (state: RootState) => state.auth.user.id,
  getIsLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  getIsTokenExist: (state: RootState) => Boolean(state.auth.token),
  getToken: (state: RootState) => state.auth.token,
};
