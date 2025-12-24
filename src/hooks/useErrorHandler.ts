import { useState, useCallback } from 'react';
import { useSnackbar } from './useSnackbar';

interface ErrorState {
    error: string | string[] | null;
    show: boolean;
}

/**
 * Hook to manage error state and display
 */
export const useErrorHandler = () => {
    const [errorState, setErrorState] = useState<ErrorState>({
        error: null,
        show: false
    });
    const { openSnackbar } = useSnackbar();

    const setError = useCallback((error: string | string[] | null) => {
        setErrorState({
            error,
            show: error !== null
        });
    }, []);

    const clearError = useCallback(() => {
        setErrorState({
            error: null,
            show: false
        });
    }, []);

    const handleApiError = useCallback(
        (err: unknown, defaultMessage = 'An error occurred. Please try again.') => {
            const errorMessage =
                (err as { response?: { data?: { message?: string | string[] } } })
                    ?.response?.data?.message || defaultMessage;
            setError(errorMessage);
            openSnackbar(
                Array.isArray(errorMessage)
                    ? errorMessage[0]
                    : errorMessage,
                'danger'
            );
        },
        [setError, openSnackbar]
    );

    return {
        error: errorState.error,
        showError: errorState.show,
        setError,
        clearError,
        handleApiError
    };
};

