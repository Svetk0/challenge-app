import { Dispatch } from 'react';
import { IFormFields } from '@/shared/types';
import staticData from '@/shared/constants/data.json';

export function formatDate(dateString: string, includeYear = true) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });

  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  }

  if (includeYear) {
    const year = date.getFullYear();
    return `${day}${suffix} ${month}, ${year}`;
  } else {
    return `${day}${suffix} ${month}`;
  }
}

type Props = {
  setUserErrorMessage: Dispatch<string>;
} & Pick<IFormFields, 'started_at' | 'finished_at'>;
const {
  errors: { dates_comparing },
} = staticData.challenge_form;
export const validateAndAdjustDates = ({ started_at, finished_at, setUserErrorMessage }: Props) => {
  if (!finished_at) return null;
  const startDate = new Date(started_at);
  const endDate = new Date(finished_at);

  if (endDate < startDate) {
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + 1);
    setUserErrorMessage(dates_comparing);
    return newEndDate.toISOString().split('T')[0];
  }

  return finished_at || null;
};
