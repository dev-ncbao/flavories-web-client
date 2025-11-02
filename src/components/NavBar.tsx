import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Dropdown,
    ListDivider,
    ListItemDecorator,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
    Tab,
    tabClasses,
    TabList,
    Tabs,
    Typography,
    useTheme
} from '@mui/joy';
import { ChevronDown, CircleUser, LogOut, Search } from 'lucide-react';
import { useCallback, useEffect, useState, type JSX } from 'react';
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
    const theme = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const onTapChange = useCallback(
        (
            _event: React.SyntheticEvent | null,
            value: string | number | null
        ): void => {
            setIndex(value as number);
            navigate(routes[value as number]);
        },
        [navigate]
    );

    const handleMenuOpenChange = useCallback(
        (_event: React.SyntheticEvent | null, isOpen: boolean) => {
            setMenuOpen(isOpen);
        },
        []
    );

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
            userService
                .profile()
                .then((response) => {
                    setUser(response.data);
                    setLoggedIn(true);
                })
                .catch(() => {
                    setLoggedIn(false);
                });
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
            width={'100%'}
            minHeight={'inherit'}
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
            <Stack
                direction={'row'}
                alignItems={'center'}
            >
                <Tabs
                    aria-label="App menu"
                    value={index}
                    onChange={onTapChange}
                    size="lg"
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
                            fontSize: 16,
                            gap: 0.5,
                            [`&& .${tabClasses.root}`]: {
                                flex: 'initial',
                                borderRadius: theme.vars.radius.lg,
                                bgcolor: 'transparent',
                                '&:hover': {
                                    bgcolor: 'neutral.100'
                                },
                                [`&.${tabClasses.selected}`]: {
                                    color: 'primary.plainColor',
                                    backgroundColor: 'primary.100',
                                    '&::after': {
                                        display: 'none'
                                    }
                                }
                            }
                        }}
                    >
                        <Tab color={index === 0 ? 'success' : 'neutral'}>
                            Home
                        </Tab>
                        <Tab color={index === 1 ? 'success' : 'neutral'}>
                            Recipe
                        </Tab>
                        <Tab color={index === 2 ? 'success' : 'neutral'}>
                            Community
                        </Tab>
                    </TabList>
                </Tabs>
                <Box
                    width={12}
                    height={0}
                />
                <Autocomplete
                    freeSolo
                    placeholder="Search..."
                    options={[]}
                    startDecorator={<Search />}
                    sx={{
                        width: 300,
                        height: 44,
                        borderRadius: theme.vars.radius.lg,
                        backgroundColor: 'transparent'
                    }}
                />
            </Stack>
            <Stack
                direction={'row'}
                alignItems={'center'}
            >
                {!loggedIn ? (
                    <Button
                        size="lg"
                        startDecorator={<CircleUser />}
                        sx={{
                            borderRadius: theme.vars.radius.lg
                        }}
                        onClick={() => {
                            navigate('/sign-in');
                        }}
                    >
                        Sign In
                    </Button>
                ) : (
                    <Dropdown
                        open={menuOpen}
                        onOpenChange={handleMenuOpenChange}
                    >
                        <MenuButton
                            sx={{
                                borderRadius: theme.vars.radius.lg
                            }}
                        >
                            <Stack
                                direction={'row'}
                                alignItems={'center'}
                                spacing={1}
                            >
                                <Avatar
                                    alt={user?.username}
                                    size="md"
                                    src={user?.avatarUrl}
                                />
                                <Stack alignItems={'flex-start'}>
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
                                <ChevronDown size={18} />
                            </Stack>
                        </MenuButton>
                        <Menu placement="bottom-end">
                            <MenuItem>
                                <ListItemDecorator>
                                    <CircleUser />
                                </ListItemDecorator>{' '}
                                Profile
                            </MenuItem>
                            <ListDivider />
                            <MenuItem
                                color="danger"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    setLoggedIn(false);
                                    navigate('/');
                                }}
                            >
                                <ListItemDecorator>
                                    <LogOut />
                                </ListItemDecorator>{' '}
                                Sign Out
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                )}
            </Stack>
        </Stack>
    );
}
