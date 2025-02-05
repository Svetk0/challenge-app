import { TEditForm } from '.';

// export type IChallenge = {
//   id: number;
//   amount: number;
//   goalTitle: string;
//   period: string;
//   datePeriodStart: string;
//   datePeriodFinish: string;
// };

// export interface NewChallenge {
//   id: number;
//   data: IChallenge;
// }

export type TChallenge = {
  id?: number;
  uuid: string;
  period_finished_at?: string;
  total_progress?: string;
  goal_progress?: string;
  duration?: string;
} & TEditForm;
