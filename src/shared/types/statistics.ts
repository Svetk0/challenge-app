import { TChallenge } from './';

export type TStatistics = {
  days_since_registration: number;
  challenges: {
    all: number;
    completed: number;
  };
  periods: {
    all_periods: {
      day: number;
      week: number;
      month: number;
    };
    successful_periods: {
      day: number;
      week: number;
      month: number;
    };
  };
  effective_challenge: {
    percent: number;
    challenge: TChallenge;
  };
  longest_challenge: {
    duration: number;
    challenge: TChallenge;
  };
};
