import { Box, Stack } from '@mui/joy';
import type { JSX } from 'react';
import HeroSection from './HeroSection';

export default function LandingPage(): JSX.Element {
    return (
        <Stack>
            <Box height={80}></Box>
            <HeroSection></HeroSection>
            <Box height={200}></Box>
        </Stack>
    );
}
