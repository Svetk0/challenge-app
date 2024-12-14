export type IChallenge = {
  id: number;
  amount: number;
  goalTitle: string;
  period: string;
  datePeriodStart: string;
  datePeriodFinish: string;
};

export interface NewChallenge {
  id: number;
  data: IChallenge;
}
