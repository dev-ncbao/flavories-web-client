import { Box, Typography, useTheme, type Theme } from '@mui/joy';
import { type JSX, type ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    variant?: 'primary' | 'dark';
}

const POSITION_STYLES = {
    'top-left': {
        top: 0,
        left: 0,
        borderRadius: (theme: Theme) => `0 0 ${theme.vars.radius.lg} 0`
    },
    'top-right': {
        top: 12,
        right: 12,
        borderRadius: (theme: Theme) => theme.vars.radius.md
    },
    'bottom-left': {
        bottom: 0,
        left: 0
    },
    'bottom-right': {
        bottom: 0,
        right: 0
    }
} as const;

export default function Badge({
    children,
    position = 'top-right',
    variant = 'dark'
}: BadgeProps): JSX.Element {
    const theme = useTheme();
    const positionStyle = POSITION_STYLES[position];

    const variantStyles =
        variant === 'primary'
            ? {
                  backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.9)`,
                  border: '1px solid rgba(255, 255, 255, 0.2)'
              }
            : {
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
              };

    return (
        <Box
            sx={{
                position: 'absolute',
                ...positionStyle,
                ...variantStyles,
                backdropFilter: 'blur(20px) saturate(120%)',
                WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                ...(position === 'top-left' && {
                    padding: '6px 10px',
                    minWidth: 32
                })
            }}
        >
            {typeof children === 'string' ? (
                <Typography
                    level="body-xs"
                    sx={{
                        color: 'white',
                        fontWeight: 500,
                        ...(position === 'top-left' && {
                            level: 'body-sm',
                            fontSize: '0.875rem',
                            lineHeight: 1
                        })
                    }}
                >
                    {children}
                </Typography>
            ) : (
                children
            )}
        </Box>
    );
}
