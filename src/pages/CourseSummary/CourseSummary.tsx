import { type JSX } from 'react';
import { Box, Stack } from '@mui/joy';
import TrendingCourseCarousel from './TrendingCourseCarousel';
import NewCourseCarousel from './NewCourseCarousel';
import MostPopularCourseCarousel from './MostPopularCourseCarousel';
import { SPACING } from '../../constants/ui.constants';

export default function CourseSummary(): JSX.Element {
    return (
        <Stack>
            <Box height={SPACING.XXL} />
            <TrendingCourseCarousel />
            <Box height={SPACING.XXL} />
            <NewCourseCarousel />
            <Box height={SPACING.XXL} />
            <MostPopularCourseCarousel />
            <Box height={SPACING.XXL} />
        </Stack>
    );
}
