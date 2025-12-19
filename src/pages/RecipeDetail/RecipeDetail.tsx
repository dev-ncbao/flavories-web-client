import { Stack, IconButton, Box, useTheme } from '@mui/joy';
import { useEffect, useState, useRef, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowUp } from 'lucide-react';
import { recipeService } from '../../services/recipe/recipe.service';
import type { RecipeDto } from '../../services/recipe/recipe.dto';
import { RecipeHeroCard } from './RecipeHeroCard';
import { IngredientCard } from './IngredientCard';
import { RecipeStepsCard } from './RecipeStepsCard';
import { CommentsCard } from './CommentsCard';
import BackLink from '../../components/BackLink';

export default function RecipeDetail(): JSX.Element {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const theme = useTheme();
    const commentsRef = useRef<HTMLDivElement>(null);

    const [recipe, setRecipe] = useState<RecipeDto>({} as RecipeDto);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await recipeService.getRecipeById(Number(id));
                setRecipe(response.data);
                // setError(null);
            } catch {
                // setError(
                //     'Unable to load this recipe. Please try again in a moment.'
                // );
            } finally {
                // setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY =
                window.scrollY || document.documentElement.scrollTop;
            setShowScrollToTop(scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCommentAdded = async () => {
        try {
            const response = await recipeService.getRecipeById(Number(id));
            setRecipe(response.data);
        } catch {
            // Error handling
        }
    };

    const handleLikeDislikeChange = async () => {
        try {
            const response = await recipeService.getRecipeById(Number(id));
            setRecipe(response.data);
        } catch {
            // Error handling
        }
    };

    const scrollToComments = () => {
        commentsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

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

            {/* Scroll to Top Button */}
            {showScrollToTop && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 24, md: 32 },
                        right: { xs: 24, md: 32 },
                        zIndex: 1000
                    }}
                >
                    <IconButton
                        onClick={scrollToTop}
                        size="lg"
                        sx={{
                            borderRadius: theme.vars.radius.xl,
                            bgcolor: 'primary.500',
                            color: 'white',
                            boxShadow: theme.vars.shadow.lg,
                            width: { xs: 48, md: 56 },
                            height: { xs: 48, md: 56 },
                            '&:hover': {
                                color: 'white',
                                bgcolor: 'primary.600',
                                boxShadow: theme.vars.shadow.xl,
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={24} />
                    </IconButton>
                </Box>
            )}
        </Stack>
    );
}
