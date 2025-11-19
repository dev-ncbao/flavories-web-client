import { IconButton, Snackbar } from '@mui/joy';
import { type ReactNode, useState, useCallback } from 'react';
import {
    SnackbarContext,
    type SnackbarOptions
} from '../contexts/SnackbarContext';
import { X } from 'lucide-react';

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [snackbar, setSnackbar] = useState<SnackbarOptions>({
        open: false,
        message: '',
        color: 'primary',
        autoHideDuration: 4000,
        startDecorator: null
    });

    const openSnackbar = useCallback(
        (
            message: string,
            color: SnackbarOptions['color'] = 'primary',
            startDecorator: ReactNode,
            duration: number = 4000
        ) => {
            setSnackbar({
                open: true,
                message,
                color,
                autoHideDuration: duration,
                startDecorator
            });
        },
        []
    );

    const handleClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar }}>
            {children}
            <Snackbar
                variant="soft"
                color={snackbar.color}
                open={snackbar.open}
                autoHideDuration={snackbar.autoHideDuration}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                startDecorator={snackbar.startDecorator}
                endDecorator={
                    <IconButton
                        variant="soft"
                        color={snackbar.color}
                        onClick={handleClose}
                    >
                        <X />
                    </IconButton>
                }
            >
                {snackbar.message}
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
