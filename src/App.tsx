import { useEffect, useRef, useState, type JSX } from 'react';
import { Box, Stack, useTheme } from '@mui/joy';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router';

export default function App(): JSX.Element {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const [stuck, setStuck] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            // Element has become sticky when its top position reaches the viewport top
            const isStuck =
                // ref.current.getBoundingClientRect().top === 0 &&
                window.scrollY > 0;

            setStuck(isStuck);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Stack
            direction={'column'}
            height={'inherit'}
            width={'inherit'}
        >
            <div
                ref={ref}
                style={{
                    height: 'fit-content',
                    minHeight: '104px',
                    width: 'inherit',
                    position: 'fixed',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1000,
                    borderBottom: stuck
                        ? `1.5px solid ${theme.vars.palette.divider}`
                        : 'none',
                    boxShadow: stuck ? theme.vars.shadow.lg : 'none',
                    transition: 'box-shadow 0.2s ease',
                    paddingInline: 64
                }}
            >
                <NavBar />
            </div>
            <Box minHeight={'104px'} />
            <Outlet />
        </Stack>
    );
}
