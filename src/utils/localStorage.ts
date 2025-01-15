import { IChallenge } from '@/types';
export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);

  if (data !== null) {
    return JSON.parse(data);
  }
  return {};
};

export const setLocalStorage = (key: string, data: IChallenge[] | IChallenge | object) => {
  localStorage.setItem(key, JSON.stringify(data));
};
