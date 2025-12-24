import { useRef, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router';
import { recipeService } from '../../services/recipe/recipe.service';
import type { RecipeDto } from '../../services/recipe/recipe.dto';
import { RecipeHeroCard } from './RecipeHeroCard';
import { IngredientCard } from './IngredientCard';
import { RecipeStepsCard } from './RecipeStepsCard';
import { CommentsCard } from './CommentsCard';
import BackLink from '../../components/BackLink';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useAsyncData } from '../../hooks/useAsyncData';
import { scrollToElement } from '../../utils/scrollUtils';
import { Stack } from '@mui/joy';

export default function RecipeDetail(): JSX.Element {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const commentsRef = useRef<HTMLDivElement>(null);
    const showScrollToTop = useScrollToTop();

    const { data: recipe, refetch } = useAsyncData<RecipeDto>({
        fetchFn: () => recipeService.getRecipeById(Number(id)),
        dependencies: [id]
    });

    const handleCommentAdded = async () => {
        await refetch();
    };

    const handleLikeDislikeChange = async () => {
        await refetch();
    };

    const scrollToComments = () => {
        scrollToElement(commentsRef.current);
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <Stack
            spacing={3}
            sx={{ px: { xs: 2, md: 6 }, py: 4 }}
        >
            <BackLink onBack={() => navigate(-1)} />
            <RecipeHeroCard
                recipe={recipe}
                onLikeDislikeChange={handleLikeDislikeChange}
                onCommentClick={scrollToComments}
            />
            <IngredientCard
                recipeIngredients={recipe.recipeIngredients || []}
            />
            <RecipeStepsCard recipeSteps={recipe.recipeSteps || []} />
            <div ref={commentsRef}>
                <CommentsCard
                    recipeComments={recipe.recipeComments || []}
                    recipeId={recipe.recipeId}
                    onCommentAdded={handleCommentAdded}
                />
            </div>
            <ScrollToTopButton show={showScrollToTop} />
        </Stack>
    );
}
