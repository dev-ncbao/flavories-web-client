import { type JSX } from 'react';
import { Box, Stack } from '@mui/joy';
import TrendingRecipe from './TrendingRecipe';
import NewRecipe from './NewRecipe';
import MostPopularRecipe from './MostPopularRecipe';

export default function RecipePage(): JSX.Element {
    return (
        <Stack>
            <Box height={48}></Box>
            <TrendingRecipe></TrendingRecipe>
            <Box height={48}></Box>
            <NewRecipe></NewRecipe>
            <Box height={48}></Box>
            <MostPopularRecipe></MostPopularRecipe>
        </Stack>
    );
}
