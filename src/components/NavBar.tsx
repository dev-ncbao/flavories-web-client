import {
    Autocomplete,
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

const routes = ['/', '/recipe', '/community'];

export default function NavBar(): JSX.Element {
    const [index, setIndex] = useState(0);
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
                spacing={1}
            >
                <Autocomplete
                    freeSolo
                    placeholder="Saerch..."
                    options={[]}
                    startDecorator={<Search />}
                    sx={{
                        width: 300,
                        height: '100%'
                    }}
                />
                <Button
                    startDecorator={<CircleUser />}
                    sx={{
                        height: '100%'
                    }}
                >
                    Sign In
                </Button>
            </Stack>
        </Stack>
    );
}
