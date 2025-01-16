import { setLocalStorage, getLocalStorage } from '@/utils/localStorage';

export const AUTH_TOKEN_KEY = 'telegram_id';
export const TELEGRAM_ID = '111';

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return getLocalStorage(AUTH_TOKEN_KEY);
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  setLocalStorage(AUTH_TOKEN_KEY, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
