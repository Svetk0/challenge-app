import { TEditForm } from '.';

export type TChallenge = {
  id?: number;
  uuid: string;
  period_finished_at?: string | null;
  total_progress?: string;
  goal_progress?: string;
  duration?: string;
} & TEditForm;
