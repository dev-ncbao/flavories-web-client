import { Stack } from '@mui/joy';
import { useEffect, useState, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router';
import { recipeService } from '../../services/recipe/recipe.service';
import type { RecipeDto } from '../../services/recipe/recipe.dto';
import { RecipeHeroCard } from './RecipeHeroCard';
import BackLink from '../../components/BackLink';

export default function RecipeDetail(): JSX.Element {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [recipe, setRecipe] = useState<RecipeDto>({} as RecipeDto);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await recipeService.getRecipeById(Number(id));
                setRecipe(response.data);
                setError(null);
            } catch {
                setError(
                    'Unable to load this recipe. Please try again in a moment.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    return (
        <Stack
            spacing={3}
            sx={{ px: { xs: 2, md: 6 }, py: 4 }}
        >
            <BackLink onBack={() => navigate(-1)} />
            <RecipeHeroCard recipe={recipe} />
        </Stack>
    );
}
