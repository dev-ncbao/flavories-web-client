import { useState, useEffect, useCallback } from 'react';

interface UseAsyncDataOptions<T> {
    fetchFn: () => Promise<{ data: T }>;
    dependencies?: unknown[];
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    enabled?: boolean;
}

interface UseAsyncDataReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to manage async data fetching with loading and error states
 */
export const useAsyncData = <T,>({
    fetchFn,
    dependencies = [],
    onSuccess,
    onError,
    enabled = true
}: UseAsyncDataOptions<T>): UseAsyncDataReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!enabled) return;

        try {
            setLoading(true);
            setError(null);
            const response = await fetchFn();
            setData(response.data);
            onSuccess?.(response.data);
        } catch (err) {
            const errorMessage =
                (err as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message ||
                'Failed to load data. Please try again.';
            setError(errorMessage);
            onError?.(err);
        } finally {
            setLoading(false);
        }
    }, [fetchFn, onSuccess, onError, enabled]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
};

