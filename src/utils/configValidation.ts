import staticData from '@/constants/data.json';
const { name, goal, period, date_start, date_finish, progress } = staticData.challenge_form;
import { FieldConfig } from '@/types';

type ConfigValidation = {
  [key: string]: FieldConfig | ((password: string) => FieldConfig);
};

export const configValidation: ConfigValidation = {
  description: {
    isDisabled: false,
    label: name.label,
    placeholder: name.placeholder,
    required: name.require_message,
    validate: {
      minLength: (v: string) => v.trim().length >= 2 || name.error_message,
      maxLength: (v: string) => v.length <= 50 || name.error_message,
      noSpaces: (v: string) => v.trim().length > 0 || name.error_message,
    },
  },
  goal: {
    type: 'number',
    label: goal.label,
    placeholder: goal.placeholder,
    required: goal.require_message,
    validate: {
      min: (v) => Number(v) >= 1 || goal.error_message,
    },
  },
  period: {
    label: period.label,
    placeholder: period.placeholder,
    required: period.require_message,
  },
  started_at: {
    type: 'date',
    label: date_start.label,
    placeholder: date_start.placeholder,
    required: date_start.require_message,
    validate: {
      min: (v) => v >= '2010-01-01' || date_start.error_message,
    },
  },
  finished_at: {
    type: 'date',
    label: date_finish.label,
    placeholder: date_finish.placeholder,
    //required: date_finish.require_message,
    isDisabled: true,
    // validate: {
    //   min: (v) => v >= '2010-01-01' || date_finish.error_message,
    // },
  },
  progress: {
    type: 'number',
    label: progress.label,
    placeholder: progress.placeholder,
    required: progress.require_message,
  },
};
