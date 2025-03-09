import { createSlice } from '@reduxjs/toolkit';
import { TChallenge } from '@/shared/types';
import { setLocalStorage, getLocalStorage } from '@/shared/utils/localStorage';

interface ChallengeState {
  challenges: TChallenge[];
}
const initialState: ChallengeState = {
  challenges: getLocalStorage('challenges') || [],
};
const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    setChallenges: (state, action: { payload: TChallenge[] }) => {
      state.challenges = action.payload;
      setLocalStorage('challenges', action.payload);
    },
  },
});
export const { setChallenges } = challengeSlice.actions;
export default challengeSlice.reducer;
