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
    MessageSquareText,
    Star,
    DollarSign
} from 'lucide-react';
import { type JSX } from 'react';
import type { CourseDto } from '../../services/course/course.dto';
import { formatDate } from '../../utils/dateUtils';

export function CourseHeroCard({
    course,
    onCommentClick
}: {
    course: CourseDto;
    onCommentClick?: () => void;
}): JSX.Element {
    const theme = useTheme();

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
                                src={course.thumbnailUrl}
                                alt={course.name}
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
                                {course.name}
                            </Typography>
                            <Typography
                                level="body-lg"
                                sx={{
                                    color: 'var(--joy-palette-neutral-600)',
                                    lineHeight: 1.6,
                                    fontSize: { xs: '0.95rem', md: '1.05rem' }
                                }}
                            >
                                {course.description}
                            </Typography>
                        </Stack>
                        <Stack spacing={2}>
                            <AuthorSummary
                                avatarUrl={course.user?.avatarUrl}
                                username={course.user?.username}
                                firstName={course.user?.firstName}
                                lastName={course.user?.lastName}
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
                                    {formatDate(course.createdAt)}
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
                                    {course.viewCount} views
                                </Chip>
                                <Chip
                                    variant="soft"
                                    size="md"
                                    startDecorator={<Star size={16} />}
                                    sx={{
                                        borderRadius: theme.vars.radius.lg,
                                        fontWeight: 500,
                                        px: 1.5,
                                        py: 0.75,
                                        color: theme.vars.palette.warning[700],
                                        backgroundColor:
                                            theme.vars.palette.warning[100]
                                    }}
                                >
                                    {course.rating?.toFixed(1) ?? '0.0'}
                                </Chip>
                                <Chip
                                    variant="soft"
                                    size="md"
                                    startDecorator={<DollarSign size={16} />}
                                    sx={{
                                        borderRadius: theme.vars.radius.lg,
                                        fontWeight: 500,
                                        px: 1.5,
                                        py: 0.75,
                                        color: theme.vars.palette.danger[700],
                                        backgroundColor:
                                            theme.vars.palette.danger[100]
                                    }}
                                >
                                    {course.price
                                        ? `${course.price.toLocaleString('vi-VN')} VND`
                                        : '0 VND'}
                                </Chip>
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
                                    {course.commentCount} comments
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

