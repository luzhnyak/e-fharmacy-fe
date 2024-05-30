import { RootState } from '@/redux/store';

export const authSelectors = {
  getUser: (state: RootState) => state.auth.user,
  getUserRole: (state: RootState) => state.auth.user.role,
  getUserId: (state: RootState) => state.auth.user.id,
  getFirstName: (state: RootState) => state.auth.user.firstName,
  getLastName: (state: RootState) => state.auth.user.lastName,
  getEmail: (state: RootState) => state.auth.user.email,
  getAvatarUrl: (state: RootState) => state.auth.user.avatarUrl,
  getIsSubscribedToEmails: (state: RootState) =>
    state.auth.user.isSubscribedToEmails,
  getIsLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  getIsTokenExist: (state: RootState) => Boolean(state.auth.token),
  getToken: (state: RootState) => state.auth.token,
};
