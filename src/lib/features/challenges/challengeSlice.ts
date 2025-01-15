import { createSlice } from '@reduxjs/toolkit';
import { IChallenge } from '@/types';
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage';
type Props = {
  payload: IChallenge;
};

const initialState = getLocalStorage('challenges');
const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    addChallenge(state, action: Props) {
      const newState = [...state, action.payload];
      //setLocalStorage({ key = "challenges", data = JSON.stringify(newState) });
      setLocalStorage('challenges', newState);
      return newState;
    },
  },
});
export const { addChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
