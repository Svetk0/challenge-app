import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TStatistics } from '@/shared/types';

interface StatisticsState {
  periods: {
    all_periods: {
      week: number;
      day: number;
      month: number;
    };
    successful_periods: {
      week: number;
      day: number;
      month: number;
    };
  };
}

const initialState: StatisticsState = {
  periods: {
    all_periods: {
      week: 0,
      day: 0,
      month: 0,
    },
    successful_periods: {
      week: 0,
      day: 0,
      month: 0,
    },
  },
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setPeriods: (state, action: PayloadAction<TStatistics['periods']>) => {
      state.periods = action.payload;
    },
  },
});

export const { setPeriods } = statisticsSlice.actions;
export default statisticsSlice.reducer;
