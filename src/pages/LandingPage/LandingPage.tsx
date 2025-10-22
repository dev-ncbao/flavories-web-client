import { Box, Stack } from '@mui/joy';
import type { JSX } from 'react';
import HeroSection from './HeroSection';
import Discover from './Discover';

export default function LandingPage(): JSX.Element {
    return (
        <Stack>
            <Box height={80}></Box>
            <HeroSection></HeroSection>
            <Box height={200}></Box>
            <Discover></Discover>
        </Stack>
    );
}
