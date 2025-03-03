import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  notification: {
    status: 'success' | 'error' | 'info' | 'warning';
    user_message: string;
  } | null;
}

const initialState: NotificationState = {
  notification: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{
        status: 'success' | 'error' | 'info' | 'warning';
        user_message: string;
      }>
    ) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
