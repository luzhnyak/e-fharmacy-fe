import { Navigate } from 'react-router-dom';
import { FC, ReactNode, useEffect } from 'react';
import { authSelectors } from '../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { authApi } from '../redux/auth/authApi';

interface IProps {
  component: ReactNode;
  redirectTo: string;
}

export const RestrictedRoute: FC<IProps> = ({
  component: Component,
  redirectTo = '/home',
}) => {
  const [refreshUser, { isLoading }] = authApi.useLazyRefreshUserQuery();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const token = useSelector(authSelectors.getToken);

  useEffect(() => {
    if (!isLoggedIn && token) refreshUser();
  }, [refreshUser, isLoggedIn, token]);

  if (isLoading) {
    return null;
  }

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
