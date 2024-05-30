import { Navigate } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { authSelectors } from '../redux/auth/authSelectors';
import { useSelector } from 'react-redux';

interface IProps {
  component: ReactNode;
  redirectTo: string;
}

export const RestrictedRoute: FC<IProps> = ({
  component: Component,
  redirectTo = '/home',
}) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
