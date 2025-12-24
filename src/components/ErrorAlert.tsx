import { Alert, Box, IconButton, Stack, Typography, useTheme } from '@mui/joy';
import { Dot, OctagonAlert, X } from 'lucide-react';
import { type JSX } from 'react';

interface ErrorAlertProps {
    error: string | string[] | null;
    onClose?: () => void;
    show?: boolean;
}

export default function ErrorAlert({
    error,
    onClose,
    show = true
}: ErrorAlertProps): JSX.Element | null {
    const theme = useTheme();

    if (!show || !error) {
        return null;
    }

    const errorMessages = Array.isArray(error) ? error : [error];

    return (
        <Alert
            variant="soft"
            color="danger"
            startDecorator={<OctagonAlert />}
            endDecorator={
                onClose && (
                    <IconButton
                        variant="soft"
                        color="danger"
                        onClick={onClose}
                        aria-label="Close error message"
                    >
                        <X />
                    </IconButton>
                )
            }
            sx={{
                alignItems: 'flex-start',
                borderRadius: theme.vars.radius.lg
            }}
        >
            <div>
                <Typography
                    level="title-sm"
                    fontWeight={700}
                    sx={{
                        color: 'var(--joy-palette-danger-700)'
                    }}
                >
                    Error
                </Typography>
                <Box height={4} />
                <Stack spacing={0.5}>
                    {errorMessages.map((message, index) => (
                        <Typography
                            key={index}
                            level="body-xs"
                            startDecorator={
                                errorMessages.length > 1 ? (
                                    <Dot size={12} />
                                ) : undefined
                            }
                            sx={{
                                color: 'var(--joy-palette-danger-700)'
                            }}
                        >
                            {message}
                        </Typography>
                    ))}
                </Stack>
            </div>
        </Alert>
    );
}

