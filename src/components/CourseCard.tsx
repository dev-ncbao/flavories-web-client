import {
    Card,
    AspectRatio,
    CardContent,
    Box,
    Typography,
    Stack,
    useTheme,
    Avatar,
    Chip
} from '@mui/joy';
import {
    Eye,
    Calendar,
    MessageSquareText,
    Play,
    Star,
    DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router';

import type { JSX } from 'react';
import type { CourseDto } from '../services/course/course.dto';

interface CourseCardProps {
    course: CourseDto;
    showRank?: boolean;
    rank?: number;
}

export default function CourseCard({
    course,
    showRank = false,
    rank
}: CourseCardProps): JSX.Element {
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
            onClick={() => {
                navigate(`/course/${course.courseId}/detail`);
            }}
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
            {course.thumbnailUrl && (
                <AspectRatio
                    ratio="16/9"
                    sx={{
                        borderRadius: theme.vars.radius.lg
                    }}
                >
                    <img
                        src={course.thumbnailUrl}
                        alt={course.name || 'Untitled Course'}
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
                            {formatDate(course.createdAt)}
                        </Typography>
                    </Box>

                    {/* Play Button Overlay - Center */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: 64, md: 80 },
                            height: { xs: 64, md: 80 },
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(10px) saturate(120%)',
                            WebkitBackdropFilter: 'blur(10px) saturate(120%)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0.6
                        }}
                    >
                        <Play
                            size={32}
                            color="white"
                            fill="white"
                            style={{
                                marginLeft: '4px' // Slight offset to center the play icon visually
                            }}
                        />
                    </Box>
                </AspectRatio>
            )}

            <CardContent>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent={'space-between'}
                    sx={{ mb: 1 }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent={'space-between'}
                        flex={1}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >
                            <Avatar
                                size="sm"
                                src={course.user?.avatarUrl}
                                alt={course.user?.username}
                            >
                                {course.user?.username?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Stack
                                alignItems={'flex-start'}
                                justifyContent={'flex-end'}
                                spacing={-0.25}
                            >
                                <Typography
                                    level="title-sm"
                                    fontWeight={600}
                                >
                                    {course.user?.firstName}{' '}
                                    {course.user?.lastName &&
                                        ` ${course.user?.lastName}`}
                                </Typography>
                                <Typography
                                    level="body-xs"
                                    sx={{
                                        color: 'var(--joy-palette-neutral-500)'
                                    }}
                                >
                                    {course.user?.username &&
                                        `(@${course.user?.username})`}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >
                            <Chip
                                variant="soft"
                                startDecorator={<Star size={14} />}
                                sx={{
                                    borderRadius: theme.vars.radius.lg,
                                    color: theme.vars.palette.warning[700],
                                    backgroundColor:
                                        theme.vars.palette.warning[100]
                                }}
                            >
                                {course.rating?.toFixed(1) ?? '0.0'}
                            </Chip>
                            <Chip
                                variant="soft"
                                startDecorator={<Eye size={14} />}
                                sx={{
                                    borderRadius: theme.vars.radius.lg,
                                    color: theme.vars.palette.gray[700],
                                    backgroundColor: '#ededed'
                                }}
                            >
                                {course.viewCount ?? 0}
                            </Chip>
                            <Chip
                                variant="soft"
                                startDecorator={<MessageSquareText size={14} />}
                                sx={{
                                    borderRadius: theme.vars.radius.lg,
                                    color: theme.vars.palette.gray[700],
                                    backgroundColor: '#ededed'
                                }}
                            >
                                {course.commentCount ?? 0}
                            </Chip>
                            <Chip
                                variant="soft"
                                startDecorator={<DollarSign size={14} />}
                                sx={{
                                    borderRadius: theme.vars.radius.lg,
                                    color: theme.vars.palette.danger[700],
                                    backgroundColor:
                                        theme.vars.palette.danger[100]
                                }}
                            >
                                {course.price
                                    ? `${course.price.toLocaleString('vi-VN')} VND`
                                    : '0 VND'}
                            </Chip>
                        </Stack>
                    </Stack>
                </Stack>
                <Typography level="title-lg">
                    {course.name || 'Untitled Course'}
                </Typography>
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
                    {course.description || 'No description available.'}
                </Typography>
            </CardContent>
        </Card>
    );
}
