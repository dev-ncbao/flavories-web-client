import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Stack,
    Typography,
    useTheme
} from '@mui/joy';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../../services/auth/auth.service';
import { useAuth } from '../../hooks/useAuth';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import PasswordInput from '../../components/PasswordInput';
import ErrorAlert from '../../components/ErrorAlert';
import BackLink from '../../components/BackLink';
import { TOKEN_KEY } from '../../constants/ui.constants';

export default function SignIn(): JSX.Element {
    const navigate = useNavigate();
    const theme = useTheme();
    const { refreshAuth } = useAuth();
    const { error, showError, setError, clearError, handleApiError } =
        useErrorHandler();

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
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
                    <PasswordInput
                        value={password}
                        onChange={setPassword}
                        label="Password:"
                        placeholder="Enter your password"
                        disabled={isLoading}
                    />
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
                            if (!usernameOrEmail || !password) {
                                setError('Please fill in all fields');
                                return;
                            }

                            try {
                                setIsLoading(true);
                                const { data } = await authService.signIn({
                                    usernameOrEmail,
                                    password
                                });
                                localStorage.setItem(TOKEN_KEY, data.accessToken);
                                await refreshAuth();
                                navigate('/');
                            } catch (err) {
                                handleApiError(err);
                            } finally {
                                setIsLoading(false);
                            }
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
