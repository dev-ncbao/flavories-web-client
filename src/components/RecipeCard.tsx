import {
    Card,
    AspectRatio,
    CardContent,
    Box,
    Typography,
    Stack,
    useTheme
} from '@mui/joy';
import {
    Star,
    ThumbsUp,
    ThumbsDown,
    Eye,
    MessageSquareText,
    Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router';
import type { RecipeDto } from '../services/recipe/recipe.dto';
import type { JSX } from 'react';

interface RecipeCardProps {
    recipe: RecipeDto;
    showRank?: boolean;
    rank?: number;
}

export default function RecipeCard({
    recipe,
    showRank = false,
    rank
}: RecipeCardProps): JSX.Element {
    const theme = useTheme();
    const navigate = useNavigate();

    const formatDate = (date?: Date) => {
        if (!date) return 'Unknown';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Card
            variant="outlined"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            sx={{
                height: '100%',
                cursor: 'pointer',
                borderRadius: 24,
                transition: 'all 0.3s ease',
                '&:hover': {
                    borderColor: theme.vars.palette.primary[500],
                    boxShadow: `0 4px 20px rgba(${theme.vars.palette.primary.mainChannel} / 0.2)`,
                    transform: 'translateY(-4px)'
                }
            }}
        >
            {recipe.thumbnail && (
                <AspectRatio
                    ratio="16/9"
                    sx={{
                        borderRadius: theme.vars.radius.lg
                    }}
                >
                    <img
                        src={recipe.thumbnail}
                        alt={recipe.name || 'Recipe'}
                        loading="lazy"
                    />

                    {/* Rank Badge - Top Left Corner */}
                    {showRank && rank !== undefined && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.9)`,
                                backdropFilter: 'blur(20px) saturate(120%)',
                                WebkitBackdropFilter:
                                    'blur(20px) saturate(120%)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: `0 0 ${theme.vars.radius.lg} 0`,
                                padding: '6px 10px',
                                minWidth: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            <Typography
                                level="body-sm"
                                sx={{
                                    color: 'white',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    lineHeight: 1
                                }}
                            >
                                #{rank}
                            </Typography>
                        </Box>
                    )}

                    {/* Date Badge - Top Right */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            backdropFilter: 'blur(20px) saturate(120%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: theme.vars.radius.md,
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
                            {formatDate(recipe.createdAt)}
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
                            fill={theme.vars.palette.yellow[400]}
                            color={theme.vars.palette.yellow[400]}
                        />
                        <Typography
                            level="body-sm"
                            fontWeight={600}
                        >
                            {recipe.rating ? Number(recipe.rating).toFixed(1) : '0.0'}
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
                            color={theme.vars.palette.green[500]}
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
                            color={theme.vars.palette.red[500]}
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
                            color={theme.vars.palette.blue[500]}
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
                            color={theme.vars.palette.purple[500]}
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
                    {recipe.description || 'No description available.'}
                </Typography>
            </CardContent>
        </Card>
    );
}
