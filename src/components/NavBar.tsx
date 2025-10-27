import {
    Autocomplete,
    Avatar,
    Button,
    Stack,
    Tab,
    tabClasses,
    TabList,
    Tabs,
    Typography
} from '@mui/joy';
import { CircleUser, Search } from 'lucide-react';
import { useEffect, useState, type JSX } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router';
import { userService } from '../services/user/user.service';
import type { UserDto } from '../services/user/user.dto';

const routes = ['/', '/recipe', '/community'];

export default function NavBar(): JSX.Element {
    const [index, setIndex] = useState(0);
    const [user, setUser] = useState<UserDto | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    function onTapChange(
        _event: React.SyntheticEvent | null,
        value: string | number | null
    ): void {
        setIndex(value as number);
        navigate(routes[value as number]);
    }

    useEffect(() => {
        const path = location.pathname;

        if (matchPath('/', path)) {
            setIndex(0);
        } else if (matchPath('/recipe/*', path)) {
            setIndex(1);
        } else if (matchPath('/community/*', path)) {
            setIndex(2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            userService.profile().then((response) => {
                setUser(response.data);
            });

            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignSelf={'center'}
            spacing={2}
            paddingY={4}
            width={'100%'}
        >
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
            <Tabs
                aria-label="App menu"
                value={index}
                onChange={onTapChange}
                size="md"
                sx={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center'
                }}
            >
                <TabList
                    disableUnderline
                    sx={{
                        justifyContent: 'center',
                        fontWeight: 'lg',
                        paddingTop: '5px',
                        [`&& .${tabClasses.root}`]: {
                            flex: 'initial',
                            bgcolor: 'transparent',
                            '&:hover': {
                                bgcolor: 'transparent'
                            },
                            [`&.${tabClasses.selected}`]: {
                                color: 'primary.plainColor',
                                '&::after': {
                                    height: 2,
                                    borderTopLeftRadius: 3,
                                    borderTopRightRadius: 3,
                                    bgcolor: 'primary.500'
                                }
                            }
                        }
                    }}
                >
                    <Tab color={index === 0 ? 'success' : 'neutral'}>Home</Tab>
                    <Tab color={index === 1 ? 'success' : 'neutral'}>
                        Recipe
                    </Tab>
                    <Tab color={index === 2 ? 'success' : 'neutral'}>
                        Community
                    </Tab>
                </TabList>
            </Tabs>
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={loggedIn ? 2 : 1}
            >
                <Autocomplete
                    freeSolo
                    placeholder="Search..."
                    options={[]}
                    startDecorator={<Search />} 
                    sx={{
                        width: 300,
                        height: '100%'
                    }}
                />
                {!loggedIn ? (
                    <Button
                        startDecorator={<CircleUser />}
                        sx={{
                            height: '100%'
                        }}
                        onClick={() => {
                            navigate('/sign-in');
                        }}
                    >
                        Sign In
                    </Button>
                ) : (
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Avatar
                            alt={user?.username}
                            size="md"
                            src={user?.avatarUrl}
                        />
                        <Stack>
                            <Typography level="body-md">
                                {user?.firstName}{' '}
                                {user?.lastName && ` ${user?.lastName}`}
                            </Typography>
                            <Typography
                                level="body-xs"
                                sx={{
                                    color: 'var(--joy-palette-neutral-500)'
                                }}
                            >
                                {user?.username && `@${user?.username}`}
                            </Typography>
                        </Stack>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
}
