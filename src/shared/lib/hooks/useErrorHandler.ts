import { useDispatch } from 'react-redux';
import { setError, clearError } from '../features/errors/errorSlice';

export const useErrorHandler = () => {
  const dispatch = useDispatch();

  const handleError = (error: unknown, user_message?: string) => {
    if (error instanceof Error) {
      dispatch(
        setError({
          message: error.message,
          user_message,
        })
      );
    } else if (typeof error === 'object' && error !== null && 'status' in error) {
      dispatch(
        setError({
          message: 'status' in error ? `Error ${error.status}` : 'Unknown error',
          code: 'status' in error ? Number(error.status) : undefined,
          user_message,
        })
      );
    } else {
      dispatch(
        setError({
          message: 'An unexpected error occurred',
          user_message,
        })
      );
    }
  };

  const clearCurrentError = () => {
    dispatch(clearError());
  };

  return { handleError, clearCurrentError };
};
