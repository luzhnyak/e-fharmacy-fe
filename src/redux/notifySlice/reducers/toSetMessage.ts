import { PayloadAction } from '@reduxjs/toolkit';

import { ISliceNotify } from '../../../types';

export const toSetMessage = (
  state: ISliceNotify,
  action: PayloadAction<string | null>
) => {
  state.message = action.payload;
  state.type = action.payload;
};
