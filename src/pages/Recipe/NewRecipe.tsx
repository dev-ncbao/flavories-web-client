import {
    Stack,
    Typography,
    CircularProgress,
    Card,
    AspectRatio,
    CardContent,
    Box,
    Button,
    useTheme,
    Alert
} from '@mui/joy';
import { useEffect, useState, useMemo, useRef, type JSX } from 'react';
import { useNavigate } from 'react-router';
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
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function NewRecipe(): JSX.Element {
    const theme = useTheme();
    const navigate = useNavigate();
    const swiperRef = useRef<SwiperType | null>(null);

    const [recipes, setRecipes] = useState<RecipeDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

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
                const response = await recipeService.getNewRecipesThisMonth(20);

                // Add 0.5 second delay for loading state
                await new Promise((resolve) => setTimeout(resolve, 500));
                setRecipes(response.data);
                setError(null);
            } catch (err) {
                setError(
                    'Failed to load new recipes. Please try again later.'
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
                >
                    <Stack>
                        <Typography level="h2">New Recipes This Month</Typography>
                        <Typography color="neutral">
                            Discover the latest recipes added this month
                        </Typography>
                    </Stack>
                    <Button
                        disabled={isButtonDisabled}
                        size="md"
                        onClick={() => navigate('/recipe/new')}
                        sx={{
                            height: 40,
                            paddingX: 3,
                            borderRadius: theme.vars.radius.lg
                        }}
                    >
                        See All New Recipes
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
                                There are no new recipes available at the
                                moment.
                            </Typography>
                        </div>
                    </Alert>
                )}

                {hasRecipes && (
                    <Box
                        sx={{
                            position: 'relative',
                            paddingLeft: '24px',
                            paddingRight: '24px',
                            marginLeft: '-24px',
                            marginRight: '-24px',
                            '& .swiper': {
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                marginTop: '-8px',
                                marginBottom: '-8px'
                            }
                        }}
                    >
                        {/* Custom Navigation Buttons */}
                        <Button
                            variant="solid"
                            color="primary"
                            disabled={isBeginning}
                            onClick={() => swiperRef.current?.slidePrev()}
                            sx={{
                                position: 'absolute',
                                left: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                minWidth: 48,
                                minHeight: 48,
                                borderRadius: '50%',
                                padding: 0,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                transition: 'all 0.3s ease',
                                '&:hover:not(:disabled)': {
                                    transform: 'translateY(-50%) scale(1.05)',
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
                                },
                                '&:disabled': {
                                    backgroundColor: theme.vars.palette.neutral[200],
                                    color: theme.vars.palette.neutral[400],
                                    cursor: 'not-allowed',
                                    boxShadow: 'none',
                                    '& svg': {
                                        color: theme.vars.palette.neutral[400]
                                    }
                                }
                            }}
                        >
                            <ChevronLeft size={24} />
                        </Button>

                        <Button
                            variant="solid"
                            color="primary"
                            disabled={isEnd}
                            onClick={() => swiperRef.current?.slideNext()}
                            sx={{
                                position: 'absolute',
                                right: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                minWidth: 48,
                                minHeight: 48,
                                borderRadius: '50%',
                                padding: 0,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                transition: 'all 0.3s ease',
                                '&:hover:not(:disabled)': {
                                    transform: 'translateY(-50%) scale(1.05)',
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
                                },
                                '&:disabled': {
                                    backgroundColor: theme.vars.palette.neutral[200],
                                    color: theme.vars.palette.neutral[400],
                                    cursor: 'not-allowed',
                                    boxShadow: 'none',
                                    '& svg': {
                                        color: theme.vars.palette.neutral[400]
                                    }
                                }
                            }}
                        >
                            <ChevronRight size={24} />
                        </Button>

                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={24}
                            slidesPerView={3}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                            onSlideChange={(swiper) => {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1
                                },
                                600: {
                                    slidesPerView: 2
                                },
                                900: {
                                    slidesPerView: 3
                                }
                            }}
                        >
                            {recipes.map((recipe, index) => (
                                <SwiperSlide key={recipe.id}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        height: '100%',
                                        cursor: 'pointer',
                                        borderRadius: 24,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor:
                                                theme.vars.palette.primary[500],
                                            boxShadow: `0 4px 20px rgba(${theme.vars.palette.primary.mainChannel} / 0.2)`,
                                            transform: 'translateY(-4px)'
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
                                                alt={recipe.name || 'Recipe'}
                                                loading="lazy"
                                            />

                                            {/* Rank Badge - Top Left Corner */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
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
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow:
                                                        '0 2px 8px rgba(0, 0, 0, 0.2)'
                                                }}
                                            >
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        color: 'white',
                                                        fontWeight: 700,
                                                        fontSize: '0.875rem',
                                                        lineHeight: 1
                                                    }}
                                                >
                                                    #{index + 1}
                                                </Typography>
                                            </Box>

                                            {/* Date Badge - Top Right */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
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
                                                        theme.vars.radius.md,
                                                    padding: '4px 8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
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
                                            {recipe.name || 'Untitled Recipe'}
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
                                                        theme.vars.palette
                                                            .yellow[400]
                                                    }
                                                    color={
                                                        theme.vars.palette
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
                                                        theme.vars.palette
                                                            .green[500]
                                                    }
                                                />
                                                <Typography
                                                    level="body-sm"
                                                    fontWeight={600}
                                                >
                                                    {recipe.likeCount || 0}
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
                                                        theme.vars.palette
                                                            .red[500]
                                                    }
                                                />
                                                <Typography
                                                    level="body-sm"
                                                    fontWeight={600}
                                                >
                                                    {recipe.dislikeCount || 0}
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
                                                        theme.vars.palette
                                                            .blue[500]
                                                    }
                                                />
                                                <Typography
                                                    level="body-sm"
                                                    fontWeight={600}
                                                >
                                                    {recipe.viewCount || 0}
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
                                                        theme.vars.palette
                                                            .purple[500]
                                                    }
                                                />
                                                <Typography
                                                    level="body-sm"
                                                    fontWeight={600}
                                                >
                                                    {recipe.commentCount || 0}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Typography
                                            level="body-sm"
                                            sx={{
                                                color: 'var(--joy-palette-neutral-500)',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {recipe.description ||
                                                'No description available.'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                )}
            </Stack>
        </Stack>
    );
}