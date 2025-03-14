import { TEditForm } from './';

export type TChallenge = {
  id?: number;
  uuid: string;
  period_finished_at?: string | null;
  total_progress?: number;
  goal_progress?: number;
  duration?: number;
} & TEditForm;
