import {
    Card,
    CardContent,
    Stack,
    AspectRatio,
    Typography,
    Chip,
    Button,
    useTheme,
    Avatar
} from '@mui/joy';
import {
    Calendar,
    Eye,
    ThumbsUp,
    MessageSquareText,
    ThumbsDown
} from 'lucide-react';
import { useState, useEffect, type JSX } from 'react';
import type { RecipeDto } from '../../services/recipe/recipe.dto';
import { formatDate } from '../../utils/dateUtils';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from '../../hooks/useSnackbar';

export function RecipeHeroCard({
    recipe,
    onLikeDislikeChange,
    onCommentClick
}: {
    recipe: RecipeDto;
    onLikeDislikeChange?: () => void;
    onCommentClick?: () => void;
}): JSX.Element {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const { openSnackbar } = useSnackbar();
    const [userReaction, setUserReaction] = useState<'liked' | 'disliked' | null>(null);
    const [localLikeCount, setLocalLikeCount] = useState(recipe.likeCount);
    const [localDislikeCount, setLocalDislikeCount] = useState(recipe.dislikeCount);

    // Sync local state with recipe data when it changes
    useEffect(() => {
        setLocalLikeCount(recipe.likeCount);
        setLocalDislikeCount(recipe.dislikeCount);
        // TODO: Set userReaction based on recipe data if backend provides this info
        // For now, we'll track it locally
    }, [recipe.likeCount, recipe.dislikeCount]);

    const handleLike = async () => {
        if (!isLoggedIn) {
            openSnackbar('Please sign in to like recipes', 'warning');
            return;
        }

        try {
            // TODO: Replace with actual API call when service is available
            // await recipeService.likeRecipe(recipe.recipeId);
            
            if (userReaction === 'liked') {
                // If already liked, remove like
                setUserReaction(null);
                setLocalLikeCount((prev) => Math.max(0, prev - 1));
            } else {
                // If disliked, switch to liked
                const wasDisliked = userReaction === 'disliked';
                setUserReaction('liked');
                setLocalLikeCount((prev) => prev + 1);
                if (wasDisliked) {
                    setLocalDislikeCount((prev) => Math.max(0, prev - 1));
                }
            }
            
            // Callback to refresh recipe data
            if (onLikeDislikeChange) {
                onLikeDislikeChange();
            }
        } catch {
            openSnackbar('Failed to update like. Please try again.', 'danger');
        }
    };

    const handleDislike = async () => {
        if (!isLoggedIn) {
            openSnackbar('Please sign in to dislike recipes', 'warning');
            return;
        }

        try {
            // TODO: Replace with actual API call when service is available
            // await recipeService.dislikeRecipe(recipe.recipeId);
            
            if (userReaction === 'disliked') {
                // If already disliked, remove dislike
                setUserReaction(null);
                setLocalDislikeCount((prev) => Math.max(0, prev - 1));
            } else {
                // If liked, switch to disliked
                const wasLiked = userReaction === 'liked';
                setUserReaction('disliked');
                setLocalDislikeCount((prev) => prev + 1);
                if (wasLiked) {
                    setLocalLikeCount((prev) => Math.max(0, prev - 1));
                }
            }
            
            // Callback to refresh recipe data
            if (onLikeDislikeChange) {
                onLikeDislikeChange();
            }
        } catch {
            openSnackbar('Failed to update dislike. Please try again.', 'danger');
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: theme.vars.radius.xl,
                boxShadow: theme.vars.shadow.lg,
                overflow: 'hidden',
                border: `1px solid ${theme.vars.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: theme.vars.shadow.xl
                }
            }}
        >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 2, md: 3 }}
                    alignItems="stretch"
                >
                    {/* Image Column */}
                    <Stack
                        sx={{
                            flexBasis: { xs: '100%', md: '40%' },
                            minWidth: 0
                        }}
                        spacing={2}
                    >
                        <AspectRatio
                            ratio="16/10"
                            sx={{
                                borderRadius: theme.vars.radius.xl,
                                overflow: 'hidden',
                                boxShadow: theme.vars.shadow.lg,
                                border: `1px solid ${theme.vars.palette.divider}`,
                                '& img': {
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    transition: 'transform 0.3s ease'
                                }
                            }}
                        >
                            <img
                                src={recipe.thumbnailUrl}
                                alt={recipe.name}
                                loading="lazy"
                            />
                        </AspectRatio>
                    </Stack>

                    {/* Content Column */}
                    <Stack
                        spacing={2.5}
                        sx={{
                            flexBasis: { xs: '100%', md: '60%' },
                            justifyContent: 'space-between'
                        }}
                    >
                        {/* Title and Description */}
                        <Stack spacing={1.5}>
                            <Typography
                                level="title-lg"
                                fontWeight={900}
                                sx={{
                                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                                    lineHeight: 1.2,
                                    color: theme.vars.palette.text.primary
                                }}
                            >
                                {recipe.name}
                            </Typography>
                            <Typography
                                level="body-lg"
                                sx={{
                                    color: 'var(--joy-palette-neutral-600)',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.95rem', md: '1.05rem' }
                                }}
                            >
                                {recipe.description}
                            </Typography>
                        </Stack>
                        <Stack spacing={2}>
                            <AuthorSummary
                                avatarUrl={recipe.user?.avatarUrl}
                                username={recipe.user?.username}
                                firstName={recipe.user?.firstName}
                                lastName={recipe.user?.lastName}
                            />

                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                            >
                                <Chip
                                    variant="soft"
                                    size="md"
                                    startDecorator={<Calendar size={16} />}
                                    sx={{
                                        borderRadius: theme.vars.radius.lg,
                                        fontWeight: 500,
                                        px: 1.5,
                                        py: 0.75,
                                        color: theme.vars.palette.gray[700],
                                        backgroundColor: '#ededed'
                                    }}
                                >
                                    {formatDate(recipe.createdAt)}
                                </Chip>
                                <Chip
                                    variant="soft"
                                    size="md"
                                    startDecorator={<Eye size={16} />}
                                    sx={{
                                        borderRadius: theme.vars.radius.lg,
                                        fontWeight: 500,
                                        px: 1.5,
                                        py: 0.75,
                                        color: theme.vars.palette.gray[700],
                                        backgroundColor: '#ededed'
                                    }}
                                >
                                    {recipe.viewCount} views
                                </Chip>
                                <Button
                                    onClick={handleLike}
                                    variant="plain"
                                    size="md"
                                    disabled={userReaction === 'disliked'}
                                    startDecorator={<ThumbsUp size={16} />}
                                    sx={{
                                        borderRadius: theme.vars.radius.lg,
                                        fontWeight: 500,
                                        px: 1.5,
                                        py: 0.75,
                                        color:
                                            userReaction === 'liked'
                                                ? theme.vars.palette.success[700]
                                                : theme.vars.palette.gray[700],
                                        backgroundColor:
                                            userReaction === 'liked'
                                                ? theme.vars.palette.success[100]
                                                : '#ededed',
                                        '&:hover': {
                                            backgroundColor:
                                                userReaction === 'liked'
                                                    ? theme.vars.palette.success[200]
                                                    : '#e0e0e0'
                                        },
                                        '&:active': {
                                            backgroundColor:
                                                userReaction === 'liked'
                                                    ? theme.vars.palette.success[100]
                                                    : '#ededed'
                                        },
                                        '&:disabled': {
                                            opacity: 0.5,
                                            cursor: 'not-allowed'
                                        }
                                    }}
                                >
                                    {localLikeCount} likes
                                </Button>
                                <Button
                                    onClick={handleDislike}
                                    variant="plain"
                                    size="md"
                                    disabled={userReaction === 'liked'}
                                    startDecorator={<ThumbsDown size={16} />}
                                    sx={{
                                        borderRadius: theme.vars.radius.lg,
                                        fontWeight: 500,
                                        px: 1.5,
                                        py: 0.75,
                                        color:
                                            userReaction === 'disliked'
                                                ? theme.vars.palette.danger[700]
                                                : theme.vars.palette.gray[700],
                                        backgroundColor:
                                            userReaction === 'disliked'
                                                ? theme.vars.palette.danger[100]
                                                : '#ededed',
                                        '&:hover': {
                                            backgroundColor:
                                                userReaction === 'disliked'
                                                    ? theme.vars.palette.danger[200]
                                                    : '#e0e0e0'
                                        },
                                        '&:active': {
                                            backgroundColor:
                                                userReaction === 'disliked'
                                                    ? theme.vars.palette.danger[100]
                                                    : '#ededed'
                                        },
                                        '&:disabled': {
                                            opacity: 0.5,
                                            cursor: 'not-allowed'
                                        }
                                    }}
                                >
                                    {localDislikeCount} dislikes
                                </Button>
                                <Button
                                    onClick={onCommentClick}
                                    variant="plain"
                                    size="md"
                                    startDecorator={
                                        <MessageSquareText size={16} />
                                    }
                                    sx={{
                                        borderRadius: theme.vars.radius.lg,
                                        fontWeight: 500,
                                        px: 1.5,
                                        py: 0.75,
                                        color: theme.vars.palette.gray[700],
                                        backgroundColor: '#ededed',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#e0e0e0'
                                        },
                                        '&:active': {
                                            backgroundColor: '#ededed'
                                        }
                                    }}
                                >
                                    {recipe.commentCount} comments
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

function AuthorSummary({
    avatarUrl,
    username,
    firstName,
    lastName
}: {
    avatarUrl?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
}): JSX.Element {
    const theme = useTheme();
    return (
        <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
                p: 1.5,
                borderRadius: theme.vars.radius.lg,
                bgcolor: 'neutral.50',
                border: `1px solid ${theme.vars.palette.divider}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                    cursor: 'pointer',
                    borderColor: theme.vars.palette.primary[500],
                    boxShadow: `0 2px 10px rgba(${theme.vars.palette.primary.mainChannel} / 0.2)`
                }
            }}
        >
            <Avatar
                size="lg"
                src={avatarUrl}
                alt={username}
                sx={{
                    border: `2px solid ${theme.vars.palette.background.surface}`,
                    boxShadow: theme.vars.shadow.sm
                }}
            >
                {username?.charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={-0.25}>
                <Typography
                    level="title-md"
                    fontWeight={700}
                    sx={{
                        color: theme.vars.palette.text.primary
                    }}
                >
                    {firstName} {lastName}
                </Typography>
                <Typography
                    level="body-sm"
                    sx={{
                        color: 'var(--joy-palette-neutral-600)',
                        fontWeight: 500
                    }}
                >
                    {username && `(@${username})`}
                </Typography>
            </Stack>
        </Stack>
    );
}
