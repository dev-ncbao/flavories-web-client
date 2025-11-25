import {
    Stack,
    Typography,
    CircularProgress,
    Card,
    AspectRatio,
    CardContent,
    Box,
    useTheme,
    Alert,
    Grid,
    Select,
    Option,
    Input,
    Button,
    FormControl,
    FormLabel
} from '@mui/joy';
import { useEffect, useState, useMemo, useRef, useCallback, type JSX } from 'react';
import type { RecipeDto } from '../../services/recipe/recipe.dto';
import { recipeService } from '../../services/recipe/recipe.service';
import {
    Info,
    Star,
    ThumbsUp,
    ThumbsDown,
    Eye,
    MessageSquareText,
    Calendar,
    SlidersHorizontal,
    X
} from 'lucide-react';

export default function TrendingRecipeList(): JSX.Element {
    const theme = useTheme();
    const ITEMS_PER_PAGE = 12;

    const [recipes, setRecipes] = useState<RecipeDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    // Filter states
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [sortBy, setSortBy] = useState<'name' | 'trendingScore' | 'createdAt'>('trendingScore');
    const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
    const [showFilters, setShowFilters] = useState(false);
    
    const observerTarget = useRef<HTMLDivElement>(null);
    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(1);

    // Keep refs in sync with state
    useEffect(() => {
        loadingRef.current = loadingMore;
    }, [loadingMore]);

    useEffect(() => {
        hasMoreRef.current = hasMore;
    }, [hasMore]);

    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    const isEmpty = useMemo(
        () => !loading && !error && recipes.length === 0,
        [loading, error, recipes.length]
    );

    const hasRecipes = useMemo(
        () => !loading && !error && recipes.length > 0,
        [loading, error, recipes.length]
    );

    // Initial fetch
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                setPage(1);
                setHasMore(true);
                pageRef.current = 1;
                hasMoreRef.current = true;
                loadingRef.current = false;
                console.log('Initial fetch starting...');
                
                const response = await recipeService.getTrendingRecipes({
                    limit: ITEMS_PER_PAGE,
                    page: 1,
                    startDate: startDate || undefined,
                    endDate: endDate || undefined,
                    sortBy,
                    sortOrder
                });

                // Add 0.5 second delay for loading state
                await new Promise((resolve) => setTimeout(resolve, 500));
                
                console.log('Initial fetch completed:', response.data.length, 'recipes');
                setRecipes(response.data);
                const hasMoreData = response.data.length === ITEMS_PER_PAGE;
                setHasMore(hasMoreData);
                hasMoreRef.current = hasMoreData;
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
    }, [ITEMS_PER_PAGE, startDate, endDate, sortBy, sortOrder]);

    // Load more recipes
    const loadMoreRecipes = useCallback(async () => {
        if (loadingRef.current || !hasMoreRef.current) {
            console.log('Load more skipped:', { loading: loadingRef.current, hasMore: hasMoreRef.current });
            return;
        }

        console.log('Loading more recipes, current page:', pageRef.current);
        
        try {
            loadingRef.current = true;
            setLoadingMore(true);
            const nextPage = pageRef.current + 1;
            const response = await recipeService.getTrendingRecipes({
                limit: ITEMS_PER_PAGE,
                page: nextPage,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
                sortBy,
                sortOrder
            });

            // Add 0.5 second delay for smoother loading
            await new Promise((resolve) => setTimeout(resolve, 500));

            console.log('Loaded recipes:', response.data.length);

            if (response.data.length > 0) {
                setRecipes((prev) => [...prev, ...response.data]);
                setPage(nextPage);
                pageRef.current = nextPage;
                const hasMoreData = response.data.length === ITEMS_PER_PAGE;
                setHasMore(hasMoreData);
                hasMoreRef.current = hasMoreData;
            } else {
                setHasMore(false);
                hasMoreRef.current = false;
            }
        } catch (err) {
            console.error('Error loading more recipes:', err);
        } finally {
            loadingRef.current = false;
            setLoadingMore(false);
        }
    }, [ITEMS_PER_PAGE, startDate, endDate, sortBy, sortOrder]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        // Wait for recipes to load and target to be in DOM
        if (!observerTarget.current || loading) {
            console.log('Observer not ready:', { hasTarget: !!observerTarget.current, loading });
            return;
        }

        console.log('Setting up intersection observer');

        const observer = new IntersectionObserver(
            (entries) => {
                console.log('Intersection triggered:', entries[0].isIntersecting);
                if (entries[0].isIntersecting) {
                    loadMoreRecipes();
                }
            },
            { 
                threshold: 0.1,
                rootMargin: '100px'
            }
        );

        const currentTarget = observerTarget.current;
        observer.observe(currentTarget);
        console.log('Observer attached to target');

        return () => {
            console.log('Cleaning up observer');
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [loadMoreRecipes, loading]);

    return (
        <Stack>
            <Box height={48}></Box>
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
                                Trending Recipes
                            </Typography>
                            <Typography color="neutral">
                                Browse all trending recipes and discover what's popular right now
                            </Typography>
                        </Stack>
                        <Button
                            variant="outlined"
                            color="neutral"
                            startDecorator={<SlidersHorizontal size={18} />}
                            onClick={() => setShowFilters(!showFilters)}
                            sx={{
                                borderRadius: theme.vars.radius.lg
                            }}
                        >
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>
                    </Stack>

                    {/* Filter Section */}
                    {showFilters && (
                        <Box
                            sx={{
                                mt: 3,
                                p: 3,
                                borderRadius: theme.vars.radius.lg,
                                border: '1px solid',
                                borderColor: theme.vars.palette.neutral[200],
                                backgroundColor: theme.vars.palette.background.surface
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid xs={12} sm={6} md={3}>
                                    <FormControl>
                                        <FormLabel>Start Date</FormLabel>
                                        <Input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            sx={{
                                                borderRadius: theme.vars.radius.md
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6} md={3}>
                                    <FormControl>
                                        <FormLabel>End Date</FormLabel>
                                        <Input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            sx={{
                                                borderRadius: theme.vars.radius.md
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6} md={3}>
                                    <FormControl>
                                        <FormLabel>Sort By</FormLabel>
                                        <Select
                                            value={sortBy}
                                            onChange={(_, value) => value && setSortBy(value)}
                                            sx={{
                                                borderRadius: theme.vars.radius.md
                                            }}
                                        >
                                            <Option value="trendingScore">Trending Score</Option>
                                            <Option value="name">Name</Option>
                                            <Option value="createdAt">Created Date</Option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12} sm={6} md={3}>
                                    <FormControl>
                                        <FormLabel>Order</FormLabel>
                                        <Select
                                            value={sortOrder}
                                            onChange={(_, value) => value && setSortOrder(value)}
                                            sx={{
                                                borderRadius: theme.vars.radius.md
                                            }}
                                        >
                                            <Option value="DESC">Descending</Option>
                                            <Option value="ASC">Ascending</Option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {(startDate || endDate) && (
                                    <Grid xs={12}>
                                        <Button
                                            variant="plain"
                                            color="neutral"
                                            size="sm"
                                            startDecorator={<X size={16} />}
                                            onClick={() => {
                                                setStartDate('');
                                                setEndDate('');
                                            }}
                                        >
                                            Clear Date Filters
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    )}

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
                        <Grid container spacing={3}>
                            {recipes.map((recipe, index) => (
                                <Grid xs={12} sm={6} md={4} key={recipe.id}>
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            height: '100%',
                                            cursor: 'pointer',
                                            borderRadius: 24,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor:
                                                    theme.vars.palette
                                                        .primary[500],
                                                boxShadow: `0 4px 20px rgba(${theme.vars.palette.primary.mainChannel} / 0.2)`,
                                                transform:
                                                    'translateY(-4px)'
                                            }
                                        }}
                                    >
                                        {recipe.image && (
                                            <AspectRatio
                                                ratio="16/9"
                                                sx={{
                                                    borderRadius:
                                                        theme.vars.radius.lg
                                                }}
                                            >
                                                <img
                                                    src={recipe.image}
                                                    alt={
                                                        recipe.name ||
                                                        'Recipe'
                                                    }
                                                    loading="lazy"
                                                />

                                                {/* Trending Rank Badge - Top Left Corner */}
                                                <Box
                                                    sx={{
                                                        position:
                                                            'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.9)`,
                                                        backdropFilter:
                                                            'blur(20px) saturate(120%)',
                                                        WebkitBackdropFilter:
                                                            'blur(20px) saturate(120%)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius: `0 0 ${theme.vars.radius.lg} 0`,
                                                        padding: '6px 10px',
                                                        minWidth: 32,
                                                        display: 'flex',
                                                        alignItems:
                                                            'center',
                                                        justifyContent:
                                                            'center',
                                                        boxShadow:
                                                            '0 2px 8px rgba(0, 0, 0, 0.2)'
                                                    }}
                                                >
                                                    <Typography
                                                        level="body-sm"
                                                        sx={{
                                                            color: 'white',
                                                            fontWeight: 700,
                                                            fontSize:
                                                                '0.875rem',
                                                            lineHeight: 1
                                                        }}
                                                    >
                                                        #{recipe.ranking || index + 1}
                                                    </Typography>
                                                </Box>

                                                {/* Date Badge - Top Right */}
                                                <Box
                                                    sx={{
                                                        position:
                                                            'absolute',
                                                        top: 12,
                                                        right: 12,
                                                        backgroundColor:
                                                            'rgba(0, 0, 0, 0.25)',
                                                        backdropFilter:
                                                            'blur(20px) saturate(120%)',
                                                        WebkitBackdropFilter:
                                                            'blur(20px) saturate(120%)',
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        borderRadius:
                                                            theme.vars
                                                                .radius.md,
                                                        padding: '4px 8px',
                                                        display: 'flex',
                                                        alignItems:
                                                            'center',
                                                        gap: 0.5
                                                    }}
                                                >
                                                    <Calendar
                                                        size={12}
                                                        color="white"
                                                    />
                                                    <Typography
                                                        level="body-xs"
                                                        sx={{
                                                            color: 'white',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {recipe.createdAt
                                                            ? new Date(
                                                                  recipe.createdAt
                                                              ).toLocaleDateString(
                                                                  'en-US',
                                                                  {
                                                                      month: 'short',
                                                                      day: 'numeric',
                                                                      year: 'numeric'
                                                                  }
                                                              )
                                                            : 'Unknown'}
                                                    </Typography>
                                                </Box>
                                            </AspectRatio>
                                        )}
                                        <CardContent>
                                            <Typography
                                                level="title-lg"
                                                sx={{ mb: 1 }}
                                            >
                                                {recipe.name ||
                                                    'Untitled Recipe'}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                alignItems="center"
                                                sx={{ mb: 1.5 }}
                                            >
                                                {/* Rating */}
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    alignItems="center"
                                                >
                                                    <Star
                                                        size={16}
                                                        fill={
                                                            theme.vars
                                                                .palette
                                                                .yellow[400]
                                                        }
                                                        color={
                                                            theme.vars
                                                                .palette
                                                                .yellow[400]
                                                        }
                                                    />
                                                    <Typography
                                                        level="body-sm"
                                                        fontWeight={600}
                                                    >
                                                        {recipe.rating?.toFixed(
                                                            1
                                                        ) || '0.0'}
                                                    </Typography>
                                                </Stack>

                                                {/* Like */}
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    alignItems="center"
                                                >
                                                    <ThumbsUp
                                                        size={16}
                                                        color={
                                                            theme.vars
                                                                .palette
                                                                .green[500]
                                                        }
                                                    />
                                                    <Typography
                                                        level="body-sm"
                                                        fontWeight={600}
                                                    >
                                                        {recipe.likeCount ||
                                                            0}
                                                    </Typography>
                                                </Stack>

                                                {/* Dislike */}
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    alignItems="center"
                                                >
                                                    <ThumbsDown
                                                        size={16}
                                                        color={
                                                            theme.vars
                                                                .palette
                                                                .red[500]
                                                        }
                                                    />
                                                    <Typography
                                                        level="body-sm"
                                                        fontWeight={600}
                                                    >
                                                        {recipe.dislikeCount ||
                                                            0}
                                                    </Typography>
                                                </Stack>

                                                {/* View Count */}
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    alignItems="center"
                                                >
                                                    <Eye
                                                        size={16}
                                                        color={
                                                            theme.vars
                                                                .palette
                                                                .blue[500]
                                                        }
                                                    />
                                                    <Typography
                                                        level="body-sm"
                                                        fontWeight={600}
                                                    >
                                                        {recipe.viewCount ||
                                                            0}
                                                    </Typography>
                                                </Stack>

                                                {/* Comment Count */}
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    alignItems="center"
                                                >
                                                    <MessageSquareText
                                                        size={16}
                                                        color={
                                                            theme.vars
                                                                .palette
                                                                .purple[500]
                                                        }
                                                    />
                                                    <Typography
                                                        level="body-sm"
                                                        fontWeight={600}
                                                    >
                                                        {recipe.commentCount ||
                                                            0}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Typography
                                                level="body-sm"
                                                sx={{
                                                    color: 'var(--joy-palette-neutral-500)',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient:
                                                        'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {recipe.description ||
                                                    'No description available.'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* Infinite Scroll Loading Indicator */}
                    {hasRecipes && hasMore && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                py: 4,
                                minHeight: '80px'
                            }}
                        >
                            {loadingMore && (
                                <Box
                                    sx={{
                                        animation: 'fadeIn 0.3s ease-in',
                                        '@keyframes fadeIn': {
                                            from: {
                                                opacity: 0,
                                                transform: 'translateY(-10px)'
                                            },
                                            to: {
                                                opacity: 1,
                                                transform: 'translateY(0)'
                                            }
                                        }
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* Intersection Observer Target */}
                    {hasRecipes && hasMore && (
                        <Box
                            ref={observerTarget}
                            sx={{
                                height: '1px',
                                width: '100%'
                            }}
                        />
                    )}

                    {/* End of List Message */}
                    {hasRecipes && !hasMore && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                py: 4
                            }}
                        >
                            <Typography
                                level="body-sm"
                                sx={{
                                    color: 'var(--joy-palette-neutral-500)'
                                }}
                            >
                                You've reached the end of trending recipes
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Stack>
            <Box height={48}></Box>
        </Stack>
    );
}
