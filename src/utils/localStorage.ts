export const setLocalStorage = (key: string, data: unknown): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }
  return [];
};
