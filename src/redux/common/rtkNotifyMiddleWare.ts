import { notifySubscription } from './notifySubscription';
import { Middleware, isFulfilled, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ApiResponse } from '../../types';

interface MyAction<T> {
  payload?: {
    data: ApiResponse<T>;
    message: string;
  };
  meta?: {
    arg?: {
      endpointName?: string;
    };
  };
  type: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const rtkNotifyMiddleWare: Middleware = _ => next => action => {
  const api = (action as MyAction<unknown>)?.type?.split('/')[0];
  const endpointName = (action as MyAction<unknown>)?.meta?.arg?.endpointName;
  const payload = (action as MyAction<unknown>)?.payload;

  const isRequestSubscribeError =
    notifySubscription[api] &&
    endpointName &&
    notifySubscription[api][endpointName]?.error;

  const isRequestSubscribeSuccess =
    notifySubscription[api] &&
    endpointName &&
    notifySubscription[api][endpointName]?.success;

  if (isRejectedWithValue(action) && isRequestSubscribeError) {
    toast.error(
      payload?.data?.message || 'Something went wrong, please try again'
    );
  }

  if (isFulfilled(action) && isRequestSubscribeSuccess) {
    toast.success(payload?.message || 'Success');
  }

  return next(action);
};
