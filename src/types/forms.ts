export type ICreateForm = {
  amount: number;
  goalTitle: string;
  period: string;
  datePeriodStart: string;
  datePeriodFinish: string;
};

export type IEditForm = {
  progress: number;
} & ICreateForm;
