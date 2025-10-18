import type { JSX } from 'react';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router';
import { Stack } from '@mui/joy';
import NavBar from './components/NavBar';

export default function App(): JSX.Element {
    return (
        <Stack
            direction={'column'}
            height={'inherit'}
            width={'inherit'}
        >
            <NavBar />
            <Routes>
                <Route
                    path="/"
                    element={<LandingPage />}
                />
                {/* <Route
                    path="/about"
                    element={<About />}
                />
                <Route
                    path="*"
                    element={<NotFound />}
                /> */}
            </Routes>
        </Stack>
    );
}
