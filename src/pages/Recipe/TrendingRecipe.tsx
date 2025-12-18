import {
    Stack,
    Typography,
    CircularProgress,
    Box,
    Button,
    useTheme,
    Alert
} from '@mui/joy';
import { useEffect, useState, useMemo, type JSX } from 'react';
import { useNavigate } from 'react-router';
import type { RecipeDto } from '../../services/recipe/recipe.dto';
import { recipeService } from '../../services/recipe/recipe.service';
import { Info, List } from 'lucide-react';
import RecipeCarousel from '../../components/RecipeCarousel';

export default function TrendingRecipe(): JSX.Element {
    const theme = useTheme();
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState<RecipeDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Calculate current month date range
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
    );

    const isEmpty = useMemo(
        () => !loading && !error && recipes.length === 0,
        [loading, error, recipes.length]
    );

    const hasRecipes = useMemo(
        () => !loading && !error && recipes.length > 0,
        [loading, error, recipes.length]
    );

    const isButtonDisabled = useMemo(
        () => !!error || isEmpty,
        [error, isEmpty]
    );

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);

                const response = await recipeService.getTopThisMonth(20);

                // Add 0.5 second delay for loading state
                await new Promise((resolve) => setTimeout(resolve, 500));
                setRecipes(response.data);
                setError(null);
            } catch (err) {
                setError(
                    'Failed to load trending recipes. Please try again later.'
                );
                console.error('Error fetching recipes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <Stack
            direction={'column'}
            alignItems={'center'}
            alignSelf={'center'}
            width={'100%'}
            sx={{
                overflowX: 'visible',
                paddingInline: 8,
                scrollbarWidth: 'none'
            }}
        >
            <Stack
                direction={'column'}
                width={'inherit'}
            >
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Stack>
                        <Typography level="h2">
                            What's Trending This Month
                        </Typography>
                        <Typography color="neutral">
                            Discover this month's hottest recipes loved by our
                            community
                        </Typography>
                    </Stack>
                    <Button
                        disabled={isButtonDisabled}
                        variant="outlined"
                        color="neutral"
                        startDecorator={<List size={18} />}
                        onClick={() =>
                            navigate('/recipe/discovery', {
                                state: {
                                    startDate: startOfMonth
                                        .toISOString()
                                        .split('T')[0],
                                    endDate: endOfMonth
                                        .toISOString()
                                        .split('T')[0],
                                    sortBy: 'trendingScore',
                                    sortOrder: 'DESC',
                                    showFilters: true
                                }
                            })
                        }
                        sx={{
                            borderRadius: theme.vars.radius.lg
                        }}
                    >
                        View All Trending Recipes This Month
                    </Button>
                </Stack>

                <Box height={32}></Box>

                {loading && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            py: 8
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Alert
                        sx={{
                            alignItems: 'flex-start',
                            borderRadius: theme.vars.radius.lg
                        }}
                        startDecorator={<Info />}
                        variant="outlined"
                        color="neutral"
                    >
                        <div>
                            <Typography
                                level="title-sm"
                                fontWeight={700}
                                sx={{
                                    color: 'var(--joy-palette-neutral-700)'
                                }}
                            >
                                Oops, sorry!
                            </Typography>
                            <Typography
                                level="body-xs"
                                sx={{
                                    color: 'var(--joy-palette-neutral-600)'
                                }}
                            >
                                {error}
                            </Typography>
                        </div>
                    </Alert>
                )}

                {isEmpty && (
                    <Alert
                        sx={{
                            alignItems: 'flex-start',
                            borderRadius: theme.vars.radius.lg
                        }}
                        startDecorator={<Info />}
                        variant="outlined"
                        color="neutral"
                    >
                        <div>
                            <Typography
                                level="title-sm"
                                fontWeight={700}
                                sx={{
                                    color: 'var(--joy-palette-neutral-700)'
                                }}
                            >
                                Oops, sorry!
                            </Typography>
                            <Typography
                                level="body-xs"
                                sx={{
                                    color: 'var(--joy-palette-neutral-600)'
                                }}
                            >
                                There is no trending recipe available at the
                                moment.
                            </Typography>
                        </div>
                    </Alert>
                )}

                {hasRecipes && (
                    <RecipeCarousel
                        recipes={recipes}
                        showRank
                    />
                )}
            </Stack>
        </Stack>
    );
}
