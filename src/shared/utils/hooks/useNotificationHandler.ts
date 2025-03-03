import { useDispatch } from 'react-redux';
import {
  setNotification,
  clearNotification,
} from '@/shared/lib/features/notifications/notificationSlice';

export const useNotificationHandler = () => {
  const dispatch = useDispatch();

  const handleNotification = (user_message: string) => {
    dispatch(
      setNotification({
        user_message: user_message,
      })
    );
  };

  const clearCurrentError = () => {
    dispatch(clearNotification());
  };

  return { handleNotification, clearCurrentError };
};
