import { Button, FormControl, FormLabel, Input, useTheme } from '@mui/joy';
import { Eye, EyeOff } from 'lucide-react';
import { useState, type JSX } from 'react';

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
    'aria-label'?: string;
}

export default function PasswordInput({
    value,
    onChange,
    label = 'Password:',
    placeholder = 'Enter your password',
    error = false,
    disabled = false,
    'aria-label': ariaLabel
}: PasswordInputProps): JSX.Element {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <FormControl error={error}>
            <FormLabel>{label}</FormLabel>
            <Input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                disabled={disabled}
                aria-label={ariaLabel}
                endDecorator={
                    <Button
                        variant="plain"
                        color="neutral"
                        onClick={togglePasswordVisibility}
                        disabled={disabled}
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                        sx={{
                            color: 'var(--joy-palette-neutral-500)',
                            '&:hover': {
                                color: 'var(--joy-palette-neutral-600)'
                            }
                        }}
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                }
                sx={{
                    borderRadius: theme.vars.radius.md
                }}
            />
        </FormControl>
    );
}

