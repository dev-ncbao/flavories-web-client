import { type JSX } from 'react';
import { Box, Stack } from '@mui/joy';
import TrendingRecipeCarousel from './TrendingRecipeCarousel';
import NewRecipeCarousel from './NewRecipeCarousel';
import MostPopularRecipe from './MostPopularRecipeCarousel';

export default function RecipeSummary(): JSX.Element {
    return (
        <Stack>
            <Box height={48}></Box>
            <TrendingRecipeCarousel></TrendingRecipeCarousel>
            <Box height={48}></Box>
            <NewRecipeCarousel></NewRecipeCarousel>
            <Box height={48}></Box>
            <MostPopularRecipe></MostPopularRecipe>
            <Box height={48}></Box>
        </Stack>
    );
}
