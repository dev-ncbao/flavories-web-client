import {
    Alert,
    Box,
    Button,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    Link,
    Stack,
    Typography,
    useTheme
} from '@mui/joy';
import { ChevronLeft, Eye, EyeOff, OctagonAlert, X } from 'lucide-react';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../../services/auth/auth.service';

export default function SignIn(): JSX.Element {
    const navigate = useNavigate();
    const theme = useTheme();

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState<string | null>(null);
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
                        onClick={() => navigate('/')}
                    >
                        <Typography
                            level="body-sm"
                            color="success"
                            fontWeight={600}
                        >
                            Back to Home
                        </Typography>
                    </Link>
                </Stack>
                <Box height={32} />
                <Stack>
                    <Typography
                        level={'h2'}
                        fontWeight={900}
                    >
                        Sign in to
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
                <Stack minWidth={350}>
                    <FormControl>
                        <FormLabel>Email or Username: </FormLabel>
                        <Input
                            value={usernameOrEmail}
                            onChange={(event) =>
                                setUsernameOrEmail(event.target.value)
                            }
                            placeholder="Enter your username or email"
                            sx={{
                                borderRadius: theme.vars.radius.md
                            }}
                        />
                    </FormControl>
                    <Box height={16} />
                    <FormControl>
                        <FormLabel>Password: </FormLabel>
                        <Input
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
                                            setShowPassword(!showPassword)
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
                                            setShowPassword(!showPassword)
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
                                <Typography
                                    level="body-xs"
                                    sx={{
                                        color: 'var(--joy-palette-danger-700)'
                                    }}
                                >
                                    {error}
                                </Typography>
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
                                .signIn({ usernameOrEmail, password })
                                .then(({ data }) => {
                                    localStorage.setItem(
                                        'token',
                                        data.accessToken
                                    );
                                    navigate('/');
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
                        Sign In
                    </Button>
                    <Box height={20} />
                    <Typography
                        level="body-sm"
                        color="neutral"
                        textAlign={'center'}
                    >
                        Don't have an account?{' '}
                        <Link
                            variant="plain"
                            color="success"
                            fontWeight={600}
                            sx={{
                                userSelect: 'none'
                            }}
                            onClick={() => navigate('/sign-up')}
                        >
                            Sign up here.
                        </Link>
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
