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
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router';

export default function SignUp(): JSX.Element {
    const navigate = useNavigate();
    const theme = useTheme();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                            <Box height={24} />
                            <Button
                                sx={{
                                    borderRadius: theme.vars.radius.md
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
