import { type JSX } from 'react';
import { Box, Stack } from '@mui/joy';
import TrendingRecipe from './TrendingRecipe';

export default function RecipePage(): JSX.Element {
    return (
        <Stack>
            <Box height={48}></Box>
            <TrendingRecipe></TrendingRecipe>
        </Stack>
    );
}
