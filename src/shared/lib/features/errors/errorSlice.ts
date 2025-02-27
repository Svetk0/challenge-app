import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  error: {
    message: string | null;
    code?: number;
    user_message?: string;
  } | null;
}

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{
        message: string;
        code?: number;
        user_message?: string;
      }>
    ) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
