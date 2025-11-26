import {
    Alert,
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    Input,
    Link,
    Stack,
    Typography,
    useTheme
} from '@mui/joy';
import {
    ChevronLeft,
    Dot,
    Eye,
    EyeOff,
    OctagonAlert,
    PartyPopper,
    X
} from 'lucide-react';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../../services/auth/auth.service';
import { useSnackbar } from '../../hooks/useSnackbar';

export default function SignUp(): JSX.Element {
    const navigate = useNavigate();
    const theme = useTheme();
    const snackbar = useSnackbar();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState<string[] | string | null>(null);
    const [showError, setShowError] = useState(false);

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
                    <Link
                        startDecorator={<ChevronLeft />}
                        variant="plain"
                        color="success"
                        padding={0}
                        onClick={() => {
                            if (window.history.length > 1) {
                                navigate(-1);
                            } else {
                                navigate('/');
                            }
                        }}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        <Typography
                            level="body-sm"
                            color="success"
                            fontWeight={600}
                        >
                            Back
                        </Typography>
                    </Link>
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
                            <FormControl>
                                <FormLabel>Password: </FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            tabIndex: 5
                                        }
                                    }}
                                    endDecorator={
                                        !showPassword ? (
                                            <Button
                                                variant="plain"
                                                color="neutral"
                                                sx={{
                                                    color: 'var(--joy-palette-neutral-500)',
                                                    '&:hover': {
                                                        color: 'var(--joy-palette-neutral-600)'
                                                    }
                                                }}
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                <Eye />
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="plain"
                                                color="neutral"
                                                sx={{
                                                    color: 'var(--joy-palette-neutral-500)',
                                                    '&:hover': {
                                                        color: 'var(--joy-palette-neutral-600)'
                                                    }
                                                }}
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                <EyeOff />
                                            </Button>
                                        )
                                    }
                                    value={password}
                                    type={!showPassword ? 'password' : 'text'}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Enter your password"
                                    sx={{
                                        borderRadius: theme.vars.radius.md
                                    }}
                                />
                            </FormControl>
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
                            <FormControl>
                                <FormLabel>Confirm password: </FormLabel>
                                <Input
                                    slotProps={{
                                        input: {
                                            tabIndex: 6
                                        }
                                    }}
                                    endDecorator={
                                        !showConfirmPassword ? (
                                            <Button
                                                variant="plain"
                                                color="neutral"
                                                sx={{
                                                    color: 'var(--joy-palette-neutral-500)',
                                                    '&:hover': {
                                                        color: 'var(--joy-palette-neutral-600)'
                                                    }
                                                }}
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                            >
                                                <Eye />
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="plain"
                                                color="neutral"
                                                sx={{
                                                    color: 'var(--joy-palette-neutral-500)',
                                                    '&:hover': {
                                                        color: 'var(--joy-palette-neutral-600)'
                                                    }
                                                }}
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                            >
                                                <EyeOff />
                                            </Button>
                                        )
                                    }
                                    value={confirmPassword}
                                    type={
                                        !showConfirmPassword
                                            ? 'password'
                                            : 'text'
                                    }
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    placeholder="Enter your password again"
                                    sx={{
                                        borderRadius: theme.vars.radius.md
                                    }}
                                />
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid xs={12}>
                        <Stack>
                            <Box height={16} />
                            {showError && (
                                <Alert
                                    sx={{
                                        alignItems: 'flex-start',
                                        borderRadius: theme.vars.radius.lg
                                    }}
                                    startDecorator={<OctagonAlert />}
                                    variant="soft"
                                    color={'danger'}
                                    endDecorator={
                                        <IconButton
                                            variant="soft"
                                            color={'danger'}
                                            onClick={() => setShowError(false)}
                                        >
                                            <X />
                                        </IconButton>
                                    }
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
                                        <Box height={4}></Box>
                                        <Stack>
                                            {error !== null &&
                                                typeof error === 'string' && (
                                                    <Typography
                                                        level="body-xs"
                                                        sx={{
                                                            color: 'var(--joy-palette-danger-700)'
                                                        }}
                                                    >
                                                        {error}
                                                    </Typography>
                                                )}
                                            {error !== null &&
                                                Array.isArray(error) &&
                                                error.map((v, i) => (
                                                    <Typography
                                                        level="body-xs"
                                                        sx={{
                                                            color: 'var(--joy-palette-danger-700)'
                                                        }}
                                                        key={i}
                                                        startDecorator={<Dot />}
                                                    >
                                                        {v}
                                                    </Typography>
                                                ))}
                                        </Stack>
                                    </div>
                                </Alert>
                            )}
                            <Box height={24} />
                            <Button
                                sx={{
                                    borderRadius: theme.vars.radius.md
                                }}
                                onClick={async () => {
                                    await authService
                                        .signUp({
                                            firstName,
                                            lastName,
                                            username,
                                            email,
                                            password,
                                            confirmPassword
                                        })
                                        .then(() => {
                                            snackbar.openSnackbar(
                                                'Congratulations! Your account has been successfully created. Please sign in to continue.',
                                                'success',
                                                <PartyPopper />
                                            );
                                            navigate('/sign-in');
                                        })
                                        .catch((err) => {
                                            setError(
                                                err.response?.data?.message ||
                                                    'An error occurred. Please try again.'
                                            );
                                            setShowError(true);
                                        });
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
