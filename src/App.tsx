import { useEffect, useState, type JSX } from 'react';
import { Stack } from '@mui/joy';
import NavBar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';
import { matchRoutes, useLocation } from 'react-router';
import { appRoutes } from './routes/routes';

export default function App(): JSX.Element {
    const location = useLocation();
    const [showNavBar, setShowNavBar] = useState(true);

    useEffect(() => {
        const matched = matchRoutes(appRoutes, location);

        if (matched?.length && matched[matched.length - 1].route.path === '*') {
            setShowNavBar(false);
        } else {
            setShowNavBar(true);
        }
    }, [location]);

    return (
        <Stack
            direction={'column'}
            height={'inherit'}
            width={'inherit'}
        >
            {showNavBar && <NavBar />}
            <AppRoutes />
        </Stack>
    );
}
