import { createSlice } from '@reduxjs/toolkit';
import { TCreateForm } from '@/types';
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage';
type Props = {
  payload: TCreateForm;
};

const initialState = getLocalStorage('challenges');
const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    addChallenge(state, action: Props) {
      const newState = [...state, action.payload];
      setLocalStorage('challenges', newState);
      return newState;
    },
  },
});
export const { addChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
