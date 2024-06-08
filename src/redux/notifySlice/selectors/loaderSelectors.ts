import { notifySubscription } from '../../common/notifySubscription';
import { RootState } from '../../store';

export const selectStatusPendingInMethods = (state: RootState) =>
  Object.entries(state).some(([nameApi, api]) => {
    if (
      Object.prototype.hasOwnProperty.call(notifySubscription, nameApi) &&
      api &&
      'queries' in api &&
      'mutations' in api
    ) {
      return [
        ...Object.values(api.queries),
        ...Object.values(api.mutations),
      ].some(
        method =>
          method?.endpointName &&
          notifySubscription[nameApi][method.endpointName]?.loader &&
          method?.status === 'pending'
      );
    }
  });
