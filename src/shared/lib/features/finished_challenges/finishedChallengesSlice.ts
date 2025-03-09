import { createSlice } from '@reduxjs/toolkit';
import { TChallenge } from '@/shared/types';
import { setLocalStorage, getLocalStorage } from '@/shared/utils/localStorage';

interface ChallengeState {
  challenges: TChallenge[];
}
const initialState: ChallengeState = {
  challenges: getLocalStorage('finished_challenges') || [],
};
const finishedChallengesSlice = createSlice({
  name: 'finished_challenges',
  initialState,
  reducers: {
    setFinishedChallenges: (state, action: { payload: TChallenge[] }) => {
      state.challenges = action.payload;
      setLocalStorage('finished_challenges', action.payload);
    },
  },
});
export const { setFinishedChallenges } = finishedChallengesSlice.actions;
export default finishedChallengesSlice.reducer;
