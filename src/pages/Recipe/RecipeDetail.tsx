import { type JSX, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    Box,
    Stack,
    Typography,
    Card,
    CardContent,
    Chip,
    IconButton,
    Avatar,
    Divider,
    Button,
    Textarea,
    CircularProgress,
    AspectRatio,
    Link
} from '@mui/joy';
import {
    ArrowLeft,
    ThumbsUp,
    Eye,
    MessageCircle,
    Star,
    Calendar,
    ChevronLeft
} from 'lucide-react';
import { recipeService } from '../../services/recipe/recipe.service';
import type { RecipeDto } from '../../services/recipe/recipe.dto';
import type { CommentDto } from '../../services/recipe/recipe-comment.dto';
import type { RecipeMediaDto } from '../../services/recipe/recipe-media.dto';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function RecipeDetail(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState<RecipeDto | null>(null);
    const [media, setMedia] = useState<RecipeMediaDto[]>([]);
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [allComments, setAllComments] = useState<CommentDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [commentsPage, setCommentsPage] = useState(1);
    const [hasMoreComments, setHasMoreComments] = useState(true);

    useEffect(() => {
        if (id) {
            loadRecipeData();
        }
    }, [id]);

    const loadRecipeData = async () => {
        if (!id) return;

        setLoading(true);
        try {
            const recipeId = parseInt(id);

            // Load recipe details, media, and all comments in parallel
            const [recipeRes, mediaRes, allCommentsRes] = await Promise.all([
                recipeService.getRecipeById(recipeId),
                recipeService.getRecipeMedia(recipeId),
                recipeService.getRecipeComments({
                    recipeId,
                    limit: 100 // Get all comments to organize them properly
                })
            ]);

            setRecipe(recipeRes.data);
            // Sort media by sortOrder
            setMedia(
                mediaRes.data.sort(
                    (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
                )
            );

            // Store all comments and filter parent comments
            const allComments = allCommentsRes.data;
            setAllComments(allComments);
            const parentComments = allComments.filter(
                (c) => c.parentId === null
            );
            setComments(parentComments.slice(0, 10));
            setHasMoreComments(parentComments.length > 10);
        } catch (error) {
            console.error('Failed to load recipe data:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreComments = () => {
        const parentComments = allComments.filter((c) => c.parentId === null);
        const nextPage = commentsPage + 1;
        const startIndex = nextPage * 10;
        const endIndex = startIndex + 10;

        const moreComments = parentComments.slice(0, endIndex);
        setComments(moreComments);
        setCommentsPage(nextPage);
        setHasMoreComments(endIndex < parentComments.length);
    };

    const getRepliesForComment = (commentId?: number) => {
        if (!commentId) return [];
        return allComments.filter((c) => c.parentId === commentId);
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/recipe');
        }
    };

    const formatDate = (date?: Date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >
                <CircularProgress size="lg" />
            </Box>
        );
    }

    if (!recipe) {
        return (
            <Box p={4}>
                <Typography level="h3">Recipe not found</Typography>
                <Button
                    onClick={handleBack}
                    sx={{ mt: 2 }}
                >
                    Go Back
                </Button>
            </Box>
        );
    }

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
                {/* Back Button */}
                <Stack alignSelf={'flex-start'}>
                    <Link
                        startDecorator={<ChevronLeft />}
                        variant="plain"
                        color="success"
                        padding={0}
                        onClick={() => navigate(-1)}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        <Typography
                            level="body-sm"
                            color="success"
                            fontWeight={600}
                        >
                            Back
                        </Typography>
                    </Link>
                </Stack>
                <Box height={16} />
                <Stack spacing={4}>
                    {/* Recipe Header */}
                    <Card>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography level="h2">
                                    {recipe.name}
                                </Typography>
                                {/* Stats Row */}
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    flexWrap="wrap"
                                    alignItems="center"
                                >
                                    {recipe.rating !== undefined && (
                                        <Chip
                                            startDecorator={<Star size={16} />}
                                            color="warning"
                                            variant="soft"
                                        >
                                            {Number(recipe.rating).toFixed(1)}
                                        </Chip>
                                    )}
                                    {recipe.viewCount !== undefined && (
                                        <Chip
                                            startDecorator={<Eye size={16} />}
                                            variant="soft"
                                        >
                                            {recipe.viewCount} views
                                        </Chip>
                                    )}
                                    {recipe.likeCount !== undefined && (
                                        <Chip
                                            startDecorator={
                                                <ThumbsUp size={16} />
                                            }
                                            color="success"
                                            variant="soft"
                                        >
                                            {recipe.likeCount}
                                        </Chip>
                                    )}
                                    {recipe.commentCount !== undefined && (
                                        <Chip
                                            startDecorator={
                                                <MessageCircle size={16} />
                                            }
                                            variant="soft"
                                        >
                                            {recipe.commentCount} comments
                                        </Chip>
                                    )}
                                    {recipe.trendingScore !== undefined && (
                                        <Chip
                                            color="danger"
                                            variant="soft"
                                        >
                                            🔥{' '}
                                            {Number(
                                                recipe.trendingScore
                                            ).toFixed(0)}
                                        </Chip>
                                    )}
                                </Stack>
                                {/* Date */}
                                {recipe.createdAt && (
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <Calendar size={16} />
                                        <Typography
                                            level="body-sm"
                                            textColor="text.secondary"
                                        >
                                            {formatDate(recipe.createdAt)}
                                        </Typography>
                                    </Stack>
                                )}
                                {/* Description */}
                                {recipe.description && (
                                    <Typography
                                        level="body-lg"
                                        sx={{ mt: 2 }}
                                    >
                                        {recipe.description}
                                    </Typography>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                    {/* Media Gallery */}
                    {media.length > 0 && (
                        <Card>
                            <CardContent>
                                <Typography
                                    level="h3"
                                    sx={{ mb: 2 }}
                                >
                                    Media Gallery
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        maxWidth: '900px',
                                        mx: 'auto'
                                    }}
                                >
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        style={{ 
                                            borderRadius: '8px',
                                            width: '100%'
                                        }}
                                    >
                                        {media.map((mediaItem, index) => (
                                            <SwiperSlide
                                                key={mediaItem.id || index}
                                            >
                                                <AspectRatio 
                                                    ratio="16/9"
                                                    sx={{
                                                        width: '100%',
                                                        minHeight: { xs: '250px', sm: '400px', md: '500px' }
                                                    }}
                                                >
                                                    {mediaItem.mediaTypeId === 1 ? (
                                                        <img
                                                            src={mediaItem.url}
                                                            alt={
                                                                mediaItem.altText ||
                                                                `Recipe image ${index + 1}`
                                                            }
                                                            style={{
                                                                objectFit: 'cover',
                                                                width: '100%',
                                                                height: '100%'
                                                            }}
                                                        />
                                                    ) : mediaItem.mediaTypeId ===
                                                      2 ? (
                                                        <iframe
                                                            src={mediaItem.url.replace(
                                                                'watch?v=',
                                                                'embed/'
                                                            )}
                                                            title={
                                                                mediaItem.altText ||
                                                                `Recipe video ${index + 1}`
                                                            }
                                                            style={{
                                                                border: 'none',
                                                                width: '100%',
                                                                height: '100%'
                                                            }}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                    ) : (
                                                        <Box
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            bgcolor="background.level1"
                                                        >
                                                            <Typography>
                                                                Unsupported media
                                                                type
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </AspectRatio>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </Box>
                            </CardContent>
                        </Card>
                    )}
                    {/* Comments Section */}
                    <Card>
                        <CardContent>
                            <Typography
                                level="h3"
                                sx={{ mb: 3 }}
                            >
                                Comments ({recipe.commentCount || 0})
                            </Typography>
                            {/* Add Comment */}
                            <Box sx={{ mb: 3 }}>
                                <Textarea
                                    placeholder="Write a comment..."
                                    value={commentText}
                                    onChange={(e) =>
                                        setCommentText(e.target.value)
                                    }
                                    minRows={3}
                                    sx={{ mb: 1 }}
                                />
                                <Button
                                    onClick={() => {
                                        // TODO: Implement submit comment
                                        console.log(
                                            'Submit comment:',
                                            commentText
                                        );
                                        setCommentText('');
                                    }}
                                    disabled={!commentText.trim()}
                                >
                                    Post Comment
                                </Button>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            {/* Comments List */}
                            <Stack spacing={3}>
                                {comments.length === 0 ? (
                                    <Typography
                                        level="body-md"
                                        textColor="text.secondary"
                                        textAlign="center"
                                        py={4}
                                    >
                                        No comments yet. Be the first to
                                        comment!
                                    </Typography>
                                ) : (
                                    <>
                                        {comments.map((comment) => {
                                            const replies =
                                                getRepliesForComment(
                                                    comment.id
                                                );
                                            return (
                                                <Box key={comment.id}>
                                                    {/* Parent Comment */}
                                                    <Stack
                                                        direction="row"
                                                        spacing={2}
                                                    >
                                                        <Avatar size="sm">
                                                            {comment.userId}
                                                        </Avatar>
                                                        <Stack
                                                            spacing={1}
                                                            flex={1}
                                                        >
                                                            <Stack
                                                                direction="row"
                                                                justifyContent="space-between"
                                                                alignItems="center"
                                                            >
                                                                <Typography level="title-sm">
                                                                    User{' '}
                                                                    {
                                                                        comment.userId
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    level="body-xs"
                                                                    textColor="text.secondary"
                                                                >
                                                                    {formatDate(
                                                                        comment.createdAt
                                                                    )}
                                                                </Typography>
                                                            </Stack>
                                                            <Typography level="body-md">
                                                                {
                                                                    comment.content
                                                                }
                                                            </Typography>
                                                            <Stack
                                                                direction="row"
                                                                spacing={2}
                                                            >
                                                                <Button
                                                                    size="sm"
                                                                    variant="plain"
                                                                    startDecorator={
                                                                        <ThumbsUp
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                    }
                                                                >
                                                                    {comment.likeCount ||
                                                                        0}
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="plain"
                                                                >
                                                                    Reply
                                                                </Button>
                                                            </Stack>
                                                            {/* Replies */}
                                                            {replies.length >
                                                                0 && (
                                                                <Stack
                                                                    spacing={2}
                                                                    sx={{
                                                                        mt: 2,
                                                                        ml: 2,
                                                                        pl: 2,
                                                                        borderLeft:
                                                                            '2px solid',
                                                                        borderColor:
                                                                            'divider'
                                                                    }}
                                                                >
                                                                    {replies.map(
                                                                        (
                                                                            reply
                                                                        ) => (
                                                                            <Stack
                                                                                key={
                                                                                    reply.id
                                                                                }
                                                                                direction="row"
                                                                                spacing={
                                                                                    2
                                                                                }
                                                                            >
                                                                                <Avatar size="sm">
                                                                                    {
                                                                                        reply.userId
                                                                                    }
                                                                                </Avatar>
                                                                                <Stack
                                                                                    spacing={
                                                                                        1
                                                                                    }
                                                                                    flex={
                                                                                        1
                                                                                    }
                                                                                >
                                                                                    <Stack
                                                                                        direction="row"
                                                                                        justifyContent="space-between"
                                                                                        alignItems="center"
                                                                                    >
                                                                                        <Typography level="title-sm">
                                                                                            User{' '}
                                                                                            {
                                                                                                reply.userId
                                                                                            }
                                                                                        </Typography>
                                                                                        <Typography
                                                                                            level="body-xs"
                                                                                            textColor="text.secondary"
                                                                                        >
                                                                                            {formatDate(
                                                                                                reply.createdAt
                                                                                            )}
                                                                                        </Typography>
                                                                                    </Stack>
                                                                                    <Typography level="body-md">
                                                                                        {
                                                                                            reply.content
                                                                                        }
                                                                                    </Typography>
                                                                                    <Stack
                                                                                        direction="row"
                                                                                        spacing={
                                                                                            2
                                                                                        }
                                                                                    >
                                                                                        <Button
                                                                                            size="sm"
                                                                                            variant="plain"
                                                                                            startDecorator={
                                                                                                <ThumbsUp
                                                                                                    size={
                                                                                                        14
                                                                                                    }
                                                                                                />
                                                                                            }
                                                                                        >
                                                                                            {reply.likeCount ||
                                                                                                0}
                                                                                        </Button>
                                                                                    </Stack>
                                                                                </Stack>
                                                                            </Stack>
                                                                        )
                                                                    )}
                                                                </Stack>
                                                            )}
                                                        </Stack>
                                                    </Stack>
                                                    <Divider sx={{ mt: 2 }} />
                                                </Box>
                                            );
                                        })}
                                        {/* Load More Button */}
                                        {hasMoreComments && (
                                            <Button
                                                variant="outlined"
                                                onClick={loadMoreComments}
                                                sx={{ mt: 2 }}
                                            >
                                                Load More Comments
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Stack>
            <Box height={48}></Box>
        </Stack>
    );
}
