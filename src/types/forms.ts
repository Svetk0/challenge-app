export interface IFormFields {
  id: number;
  description: string;
  goal: number;
  period: string;
  started_at: string;
  finished_at: string;
  progress: number;
}

export type TCreateForm = Pick<
  IFormFields,
  'description' | 'goal' | 'period' | 'started_at' | 'finished_at'
>;

export type TEditForm = Pick<IFormFields, 'progress'> & TCreateForm;
