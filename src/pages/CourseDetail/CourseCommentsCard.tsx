import {
    Card,
    CardContent,
    Stack,
    Typography,
    useTheme,
    Box,
    Avatar,
    Textarea,
    Button
} from '@mui/joy';
import { MessageSquareText, Send } from 'lucide-react';
import { useState, useEffect, type JSX } from 'react';
import { formatDate } from '../../utils/dateUtils';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { courseService } from '../../services/course/course.service';
import type { CourseCommentDto } from '../../services/course/course.dto';

export function CourseCommentsCard({
    courseComments,
    courseId,
    onCommentAdded
}: {
    courseComments: CourseCommentDto[];
    courseId?: number;
    onCommentAdded?: () => void;
}): JSX.Element {
    const theme = useTheme();
    const { openSnackbar } = useSnackbar();
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [comments, setComments] = useState<CourseCommentDto[]>(courseComments);

    // Sync comments when courseComments prop changes
    useEffect(() => {
        setComments(courseComments);
    }, [courseComments]);

    const handleSubmit = async () => {
        if (!isLoggedIn) {
            openSnackbar('Please sign in to post a comment', 'warning');
            return;
        }

        if (!commentText.trim()) {
            openSnackbar('Please enter a comment', 'warning');
            return;
        }

        if (!courseId) {
            openSnackbar('Course ID is missing', 'danger');
            return;
        }

        if (!user?.userId) {
            openSnackbar('User information is missing', 'danger');
            return;
        }

        setIsSubmitting(true);
        try {
            await courseService.postComment({
                courseId,
                userId: user.userId,
                comment: commentText.trim()
            });

            // Create new comment object optimistically
            const newComment: CourseCommentDto = {
                courseCommentId: Date.now(), // Temporary ID, will be replaced when refreshed
                comment: commentText.trim(),
                createdAt: new Date(),
                user: {
                    username: user.username || '',
                    avatarUrl: user.avatarUrl || '',
                    firstName: user.firstName || '',
                    lastName: user.lastName || ''
                }
            };

            // Add new comment to the top of the list (since we sort DESC)
            setComments((prev) => [newComment, ...prev]);
            setCommentText('');
            openSnackbar('Comment posted successfully!', 'success');

            // Callback to refresh comments from server to get the actual comment with correct ID
            if (onCommentAdded) {
                onCommentAdded();
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            openSnackbar('Failed to post comment. Please try again.', 'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleSubmit();
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
                <Stack spacing={2.5}>
                    {/* Header */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{
                            pb: 1.5,
                            borderBottom: `1px solid ${theme.vars.palette.divider}`
                        }}
                    >
                        <Box
                            sx={{
                                p: 1,
                                borderRadius: theme.vars.radius.lg,
                                bgcolor: 'primary.50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <MessageSquareText
                                size={20}
                                color={theme.vars.palette.primary[500]}
                            />
                        </Box>
                        <Typography
                            level="title-lg"
                            fontWeight={700}
                            sx={{
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                color: theme.vars.palette.text.primary
                            }}
                        >
                            Comments
                        </Typography>
                        <Typography
                            level="body-sm"
                            sx={{
                                color: 'var(--joy-palette-neutral-600)',
                                fontWeight: 500,
                                ml: 'auto'
                            }}
                        >
                            {comments.length} comments
                        </Typography>
                    </Stack>

                    {/* Comment Input */}
                    {isLoggedIn ? (
                        <Box
                            sx={{
                                p: 1.5,
                                borderRadius: theme.vars.radius.lg,
                                bgcolor: 'neutral.50',
                                border: `1px solid ${theme.vars.palette.divider}`,
                                transition: 'all 0.2s ease',
                                '&:focus-within': {
                                    borderColor:
                                        theme.vars.palette.primary[500],
                                    boxShadow: `0 0 0 3px rgba(${theme.vars.palette.primary.mainChannel} / 0.1)`
                                }
                            }}
                        >
                            <Stack spacing={1.5}>
                                <Textarea
                                    placeholder="Write a comment..."
                                    value={commentText}
                                    onChange={(e) =>
                                        setCommentText(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    minRows={3}
                                    maxRows={6}
                                    sx={{
                                        '--Textarea-focusedHighlight':
                                            theme.vars.palette.primary[500],
                                        '&::before': {
                                            display: 'none'
                                        },
                                        '& textarea': {
                                            fontSize: {
                                                xs: '0.9rem',
                                                md: '0.95rem'
                                            },
                                            lineHeight: 1.6,
                                            color: theme.vars.palette.text
                                                .primary
                                        },
                                        '& textarea::placeholder': {
                                            color: 'var(--joy-palette-neutral-500)',
                                            opacity: 0.7
                                        }
                                    }}
                                />
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={
                                            !commentText.trim() || isSubmitting
                                        }
                                        startDecorator={<Send size={16} />}
                                        sx={{
                                            borderRadius: theme.vars.radius.lg,
                                            fontWeight: 600,
                                            px: 2,
                                            py: 0.75,
                                            bgcolor: 'primary.500',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'primary.600'
                                            },
                                            '&:disabled': {
                                                bgcolor: 'neutral.300',
                                                color: 'neutral.500'
                                            }
                                        }}
                                    >
                                        {isSubmitting
                                            ? 'Posting...'
                                            : 'Post Comment'}
                                    </Button>
                                </Stack>
                                <Typography
                                    level="body-xs"
                                    sx={{
                                        color: 'var(--joy-palette-neutral-500)',
                                        textAlign: 'right',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    Press Ctrl+Enter (or Cmd+Enter) to submit
                                </Typography>
                            </Stack>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: theme.vars.radius.lg,
                                bgcolor: 'neutral.50',
                                border: `1px solid ${theme.vars.palette.divider}`,
                                textAlign: 'center'
                            }}
                        >
                            <Typography
                                level="body-md"
                                sx={{
                                    color: 'var(--joy-palette-neutral-600)',
                                    mb: 1
                                }}
                            >
                                Please sign in to post a comment
                            </Typography>
                            <Button
                                onClick={() => navigate('/sign-in')}
                                variant="soft"
                                color="primary"
                                sx={{
                                    borderRadius: theme.vars.radius.lg,
                                    fontWeight: 600
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    )}

                    {/* Comments List */}
                    <Stack spacing={2}>
                        {comments.length === 0 ? (
                            <Typography
                                level="body-md"
                                sx={{
                                    color: 'var(--joy-palette-neutral-500)',
                                    textAlign: 'center',
                                    py: 2
                                }}
                            >
                                No comments yet. Be the first to comment!
                            </Typography>
                        ) : (
                            [...comments]
                                .sort((a, b) => {
                                    const dateA = new Date(
                                        a.createdAt
                                    ).getTime();
                                    const dateB = new Date(
                                        b.createdAt
                                    ).getTime();
                                    return dateB - dateA; // Descending order (newest first)
                                })
                                .map((comment) => (
                                    <Box
                                        key={comment.courseCommentId}
                                        sx={{
                                            p: 1.5,
                                            borderRadius: theme.vars.radius.lg,
                                            bgcolor: 'neutral.50',
                                            border: `1px solid ${theme.vars.palette.divider}`,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                borderColor:
                                                    theme.vars.palette
                                                        .primary[300],
                                                bgcolor: 'primary.50',
                                                transform: 'translateX(4px)'
                                            }
                                        }}
                                    >
                                        <Stack spacing={1.5}>
                                            {/* User Info */}
                                            <Stack
                                                direction="row"
                                                spacing={1.5}
                                                alignItems="center"
                                            >
                                                <Avatar
                                                    size="md"
                                                    src={comment.user?.avatarUrl}
                                                    alt={comment.user?.username}
                                                    sx={{
                                                        border: `2px solid ${theme.vars.palette.background.surface}`,
                                                        boxShadow:
                                                            theme.vars.shadow.sm
                                                    }}
                                                >
                                                    {comment.user?.username
                                                        ?.charAt(0)
                                                        .toUpperCase()}
                                                </Avatar>
                                                <Stack
                                                    spacing={-0.25}
                                                    flex={1}
                                                >
                                                    <Typography
                                                        level="title-sm"
                                                        fontWeight={600}
                                                        sx={{
                                                            color: theme.vars
                                                                .palette.text
                                                                .primary
                                                        }}
                                                    >
                                                        {comment.user?.firstName}{' '}
                                                        {comment.user?.lastName}
                                                    </Typography>
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                    >
                                                        <Typography
                                                            level="body-xs"
                                                            sx={{
                                                                color: 'var(--joy-palette-neutral-600)',
                                                                fontWeight: 500
                                                            }}
                                                        >
                                                            {comment.user
                                                                ?.username &&
                                                                `@${comment.user.username}`}
                                                        </Typography>
                                                        <Typography
                                                            level="body-xs"
                                                            sx={{
                                                                color: 'var(--joy-palette-neutral-500)',
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            •
                                                        </Typography>
                                                        <Typography
                                                            level="body-xs"
                                                            sx={{
                                                                color: 'var(--joy-palette-neutral-500)',
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            {formatDate(
                                                                comment.createdAt
                                                            )}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Stack>

                                            {/* Comment Text */}
                                            <Typography
                                                level="body-md"
                                                sx={{
                                                    color: theme.vars.palette
                                                        .text.primary,
                                                    lineHeight: 1.6,
                                                    pl: { xs: 0, md: 0 },
                                                    fontSize: {
                                                        xs: '0.9rem',
                                                        md: '0.95rem'
                                                    }
                                                }}
                                            >
                                                {comment.comment}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                ))
                        )}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

