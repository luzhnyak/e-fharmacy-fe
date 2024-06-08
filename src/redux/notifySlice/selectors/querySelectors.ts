import { notifySubscription } from '../../common/notifySubscription';
import { RootState } from '../../store';

export const selectQueryIdNotify = (state: RootState) =>
  state.notify.queriesRejected.map(query => query.requestId);

export const selectQueryRejected = (state: RootState) => {
  let rejectedQuery = null;

  Object.entries(state).some(([nameApi, api]) => {
    if (
      Object.prototype.hasOwnProperty.call(notifySubscription, nameApi) &&
      api &&
      'queries' in api
    ) {
      rejectedQuery = Object.values(api.queries).find(query => {
        const isQueryRejected =
          query?.endpointName &&
          notifySubscription[nameApi][query.endpointName]?.error &&
          query?.status === 'rejected';

        const isQueryRejectedActual =
          query?.requestId &&
          !selectQueryIdNotify(state).includes(query?.requestId);

        return isQueryRejected && isQueryRejectedActual;
      });

      if (rejectedQuery) {
        rejectedQuery = { ...rejectedQuery, nameApi };

        return true;
      }
    }
  });

  return rejectedQuery || null;
};
