// export type ICreateForm = {
//   amount: number;
//   goalTitle: string;
//   period: string;
//   datePeriodStart: string;
//   datePeriodFinish: string;
// };

// export type IEditForm = {
//   progress: number;
// } & ICreateForm;

export type TCreateForm = {
  description: string;
  goal: number;
  period: string;
  started_at: string;
  finished_at: string;
};

export type TEditForm = {
  progress: number;
} & TCreateForm;
