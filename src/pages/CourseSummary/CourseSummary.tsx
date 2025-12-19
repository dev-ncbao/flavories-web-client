import { type JSX } from 'react';
import { Box, Stack } from '@mui/joy';
import TrendingCourseCarousel from './TrendingCourseCarousel';
import NewCourseCarousel from './NewCourseCarousel';
import MostPopularCourseCarousel from './MostPopularCourseCarousel';

export default function CourseSummary(): JSX.Element {
    return (
        <Stack>
            <Box height={48}></Box>
            <TrendingCourseCarousel></TrendingCourseCarousel>
            <Box height={48}></Box>
            <NewCourseCarousel></NewCourseCarousel>
            <Box height={48}></Box>
            <MostPopularCourseCarousel></MostPopularCourseCarousel>
            <Box height={48}></Box>
        </Stack>
    );
}
