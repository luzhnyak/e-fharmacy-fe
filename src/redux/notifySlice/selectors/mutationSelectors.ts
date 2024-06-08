import { notifySubscription } from '../../common/notifySubscription';
import { RootState } from '../../store';

export const selectMutationsIdNotify = (state: RootState) =>
  state.notify.mutationsExecuted.map(mutation => mutation.requestId);

export const selectMutationsEndPointsNotify = (state: RootState) =>
  state.notify.mutationsExecuted.map(mutation => mutation.endpointName);

export const selectExecutedMutation = (state: RootState) => {
  let mutationExecuted = null;

  Object.entries(state).some(([nameApi, api]) => {
    const isApiSubscribe =
      Object.prototype.hasOwnProperty.call(notifySubscription, nameApi) &&
      api &&
      'mutations' in api;

    if (isApiSubscribe) {
      const arrMutations = Object.values(api.mutations);
      const mutation = arrMutations[arrMutations.length - 1];

      const isMutationSubscribeSuccess =
        mutation?.endpointName &&
        notifySubscription[nameApi][mutation.endpointName]?.success;

      const isMutationSubscribeError =
        mutation?.endpointName &&
        notifySubscription[nameApi][mutation.endpointName]?.error;

      const isMutationActual =
        mutation?.requestId &&
        !selectMutationsIdNotify(state).includes(mutation?.requestId);

      const isMutationExectuted =
        (mutation?.status === 'fulfilled' && isMutationSubscribeSuccess) ||
        (mutation?.status === 'rejected' && isMutationSubscribeError);

      if (isMutationActual && isMutationExectuted) {
        mutationExecuted = { ...mutation, nameApi };

        return true;
      }
    }
  });

  return mutationExecuted || null;
};
