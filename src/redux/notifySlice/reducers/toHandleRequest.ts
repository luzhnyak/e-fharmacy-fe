import { errors } from '../../../consts/errors';
import { PayloadAction } from '@reduxjs/toolkit';
import { ICombineRequests, ISliceNotify } from '../../../types';

export const toHandleRequest = (
  state: ISliceNotify,
  action: PayloadAction<ICombineRequests>
) => {
  const { executedMutation = null, rejectedQuery = null } = action.payload;

  if (executedMutation) {
    const filteredMutations = state.mutationsExecuted.filter(
      mutation => mutation.endpointName !== executedMutation.endpointName
    );

    state.mutationsExecuted = [...filteredMutations, executedMutation];
  }

  if (rejectedQuery) {
    const filteredQueries = state.queriesRejected.filter(
      query => query.endpointName !== rejectedQuery.endpointName
    );

    state.queriesRejected = [...filteredQueries, rejectedQuery];
  }

  if (executedMutation?.status === 'rejected') {
    state.message =
      executedMutation.error?.data?.message || errors.SERVER_NOT_RESPONSE;
    state.type = 'error';
  } else if (rejectedQuery?.status === 'rejected') {
    state.message =
      rejectedQuery.error?.data?.message || errors.SERVER_NOT_RESPONSE;
    state.type = 'error';
  } else if (executedMutation?.status === 'fulfilled') {
    state.message = executedMutation.data?.message;
    state.type = 'success';
  }
};
