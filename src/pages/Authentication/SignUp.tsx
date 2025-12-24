import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Link,
    Stack,
    Typography,
    useTheme
} from '@mui/joy';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../../services/auth/auth.service';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import PasswordInput from '../../components/PasswordInput';
import ErrorAlert from '../../components/ErrorAlert';
import BackLink from '../../components/BackLink';

export default function SignUp(): JSX.Element {
    const navigate = useNavigate();
    const theme = useTheme();
    const { openSnackbar } = useSnackbar();
    const { error, showError, setError, clearError, handleApiError } =
        useErrorHandler();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'inherit'}
            width={'inherit'}
            paddingX={8}
        >
            <Stack
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Stack alignSelf={'flex-start'}>
                    <BackLink
                        onBack={() => {
                            if (window.history.length > 1) {
                                navigate(-1);
                            } else {
                                navigate('/');
                            }
                        }}
                    />
                </Stack>
                <Box height={32} />
                <Stack>
                    <Typography
                        level={'h2'}
                        fontWeight={900}
                    >
                        Sign up for
                    </Typography>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={1}
                    >
                        <img
                            src="/src/assets/burger.png"
                            alt="https://www.flaticon.com/free-icons/burger"
                            width={32}
                            height={32}
                        />
                        <Typography
                            level={'h3'}
                            fontWeight={900}
                            textColor={'success.600'}
                        >
                            Flavories
                        </Typography>
                    </Stack>
                </Stack>
                <Box height={24} />
                <Grid
                    container
                    columnSpacing={2.5}
                >
                    <Grid xs={6}>
                        <Stack minWidth={350}>
                            <FormControl>
                                <FormLabel>First Name: </FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            tabIndex: 1
                                        }
                                    }}
                                    value={firstName}
                                    onChange={(event) =>
                                        setFirstName(event.target.value)
                                    }
                                    placeholder="Enter your first name"
                                    sx={{
                                        borderRadius: theme.vars.radius.md
                                    }}
                                />
                            </FormControl>
                            <Box height={16} />
                            <FormControl>
                                <FormLabel>Email: </FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            tabIndex: 3
                                        }
                                    }}
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="Enter your email"
                                    sx={{
                                        borderRadius: theme.vars.radius.md
                                    }}
                                />
                            </FormControl>
                            <Box height={16} />
                            <PasswordInput
                                value={password}
                                onChange={setPassword}
                                label="Password:"
                                placeholder="Enter your password"
                                disabled={isLoading}
                            />
                        </Stack>
                    </Grid>
                    <Grid xs={6}>
                        <Stack minWidth={350}>
                            <FormControl>
                                <FormLabel>Last Name: </FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            tabIndex: 2
                                        }
                                    }}
                                    value={lastName}
                                    onChange={(event) =>
                                        setLastName(event.target.value)
                                    }
                                    placeholder="Enter your first name"
                                    sx={{
                                        borderRadius: theme.vars.radius.md
                                    }}
                                />
                            </FormControl>
                            <Box height={16} />
                            <FormControl>
                                <FormLabel>Username: </FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            tabIndex: 4
                                        }
                                    }}
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    placeholder="Enter your username"
                                    sx={{
                                        borderRadius: theme.vars.radius.md
                                    }}
                                />
                            </FormControl>
                            <Box height={16} />
                            <PasswordInput
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                label="Confirm password:"
                                placeholder="Enter your password again"
                                disabled={isLoading}
                            />
                        </Stack>
                    </Grid>
                    <Grid xs={12}>
                        <Stack>
                            <Box height={16} />
                            <ErrorAlert
                                error={error}
                                show={showError}
                                onClose={clearError}
                            />
                            <Box height={24} />
                            <Button
                                sx={{
                                    borderRadius: theme.vars.radius.md
                                }}
                                loading={isLoading}
                                onClick={async () => {
                                    if (
                                        !firstName ||
                                        !lastName ||
                                        !username ||
                                        !email ||
                                        !password ||
                                        !confirmPassword
                                    ) {
                                        setError('Please fill in all fields');
                                        return;
                                    }

                                    if (password !== confirmPassword) {
                                        setError('Passwords do not match');
                                        return;
                                    }

                                    try {
                                        setIsLoading(true);
                                        await authService.signUp({
                                            firstName,
                                            lastName,
                                            username,
                                            email,
                                            password,
                                            confirmPassword
                                        });
                                        openSnackbar(
                                            'Congratulations 🎉! Your account has been successfully created. Please sign in to continue.',
                                            'success'
                                        );
                                        navigate('/sign-in');
                                    } catch (err) {
                                        handleApiError(err);
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }}
                            >
                                Sign Up
                            </Button>
                            <Box height={20} />
                            <Typography
                                level="body-sm"
                                color="neutral"
                                textAlign={'center'}
                            >
                                Already have an account?{' '}
                                <Link
                                    variant="plain"
                                    color="success"
                                    fontWeight={600}
                                    sx={{
                                        userSelect: 'none'
                                    }}
                                    onClick={() => navigate('/sign-in')}
                                >
                                    Sign in.
                                </Link>
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    );
}
