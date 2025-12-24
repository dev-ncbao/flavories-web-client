import { type JSX } from 'react';
import { Box, Stack } from '@mui/joy';
import TrendingRecipeCarousel from './TrendingRecipeCarousel';
import NewRecipeCarousel from './NewRecipeCarousel';
import MostPopularRecipe from './MostPopularRecipeCarousel';
import { SPACING } from '../../constants/ui.constants';

export default function RecipeSummary(): JSX.Element {
    return (
        <Stack>
            <Box height={SPACING.XXL} />
            <TrendingRecipeCarousel />
            <Box height={SPACING.XXL} />
            <NewRecipeCarousel />
            <Box height={SPACING.XXL} />
            <MostPopularRecipe />
            <Box height={SPACING.XXL} />
        </Stack>
    );
}
