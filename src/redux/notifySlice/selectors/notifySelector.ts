import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

import { selectStatusPendingInMethods } from './loaderSelectors';

export const selectNotifyMessage = (state: RootState) => state.notify.message;
export const selectNotifyType = (state: RootState) => state.notify.type;

export const selectNotify = createSelector(
  [selectStatusPendingInMethods],
  isLoading => ({ isLoading })
);
