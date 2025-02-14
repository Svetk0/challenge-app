import { createSlice } from '@reduxjs/toolkit';
import { TCreateForm, TChallenge } from '@/types';
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage';

interface ChallengeState {
  challenges: TCreateForm[];
}
const initialState: ChallengeState = {
  challenges: getLocalStorage('challenges') || [],
};
const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    addChallenge(state, action: { payload: TCreateForm }) {
      state.challenges.push(action.payload);
    },
    setChallenges: (state, action: { payload: TChallenge[] }) => {
      state.challenges = action.payload;
      setLocalStorage('challenges', action.payload);
    },
  },
});
export const { addChallenge, setChallenges } = challengeSlice.actions;
export default challengeSlice.reducer;
