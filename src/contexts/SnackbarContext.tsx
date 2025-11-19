import { createContext, type ReactNode } from 'react';

// Define the shape of the snackbar options and context
export interface SnackbarOptions {
    message: string;
    open: boolean;
    color?: 'primary' | 'success' | 'danger' | 'warning';
    autoHideDuration?: number | null;
    startDecorator?: ReactNode | null;
}

export interface SnackbarContextType {
    openSnackbar: (
        message: string,
        color?: SnackbarOptions['color'],
        startDecorator?: ReactNode,
        duration?: number
    ) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
    undefined
);
