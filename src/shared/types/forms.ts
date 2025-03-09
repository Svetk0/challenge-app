export interface IFormFields {
  id: number;
  description: string;
  goal: number;
  period: string;
  started_at: string;
  finished_at: string | null;
  progress: number;
  is_finished: boolean;
}

export type TCreateForm = Pick<
  IFormFields,
  'description' | 'goal' | 'period' | 'started_at' | 'finished_at'
>;

export type TEditForm = Pick<IFormFields, 'progress' | 'is_finished'> & TCreateForm;

export type FieldConfig = {
  type?: 'text' | 'number' | 'date' | 'email' | 'tel';
  label: string;
  placeholder: string;
  required?: string;
  isDisabled?: boolean;
  // validate?: Record<string, (value: string | number) => boolean | string>;
  validate?: {
    [key: string]: (value: string) => string | number | boolean;
  };
};
