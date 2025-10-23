import { type JSX } from 'react';
import { Stack } from '@mui/joy';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router';

export default function App(): JSX.Element {
    return (
        <Stack
            direction={'column'}
            height={'inherit'}
            width={'inherit'}
            paddingX={8}
        >
            <NavBar />
            <Outlet />
        </Stack>
    );
}
