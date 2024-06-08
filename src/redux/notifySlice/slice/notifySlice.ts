import { createSlice } from '@reduxjs/toolkit';

import { ISliceNotify } from '../../../types';

import { toHandleRequest } from '../reducers/toHandleRequest';
import { toSetMessage } from '../reducers/toSetMessage';

const initialState: ISliceNotify = {
  mutationsExecuted: [],
  queriesRejected: [],
  message: null,
  type: null,
};

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    handleRequest: toHandleRequest,
    setMessage: toSetMessage,
  },
});

export const notifySliceReducer = notifySlice.reducer;
export const { handleRequest, setMessage } = notifySlice.actions;
