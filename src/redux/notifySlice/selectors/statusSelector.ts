import { createSelector } from '@reduxjs/toolkit';

import { selectExecutedMutation } from './mutationSelectors';
import { selectQueryRejected } from './querySelectors';

export const selectRequestStatus = createSelector(
  [selectExecutedMutation, selectQueryRejected],
  (executedMutation, rejectedQuery) => ({ executedMutation, rejectedQuery })
);
