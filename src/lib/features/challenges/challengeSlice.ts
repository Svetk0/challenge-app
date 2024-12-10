import { createSlice } from "@reduxjs/toolkit";
import { ICreateForm } from "@/types";
type Props = {
  payload: ICreateForm;
};
const storage: ICreateForm[] = [
  {
    amount: 20,
    goalTitle: "1st string",
    period: "week",
    datePeriodStart: "date start",
    datePeriodFinish: "date end",
  },
  {
    amount: 10,
    goalTitle: "2nd string",
    period: "day",
    datePeriodStart: "date start",
    datePeriodFinish: "date end",
  },
];

const initialState = storage;
const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    addChallenge(state, action: Props) {
      return { ...state, ...action.payload };
    },
  },
});
export const { addChallenge } = challengeSlice.actions;
export default challengeSlice.reducer;
