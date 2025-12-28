import {
    Card,
    CardContent,
    Stack,
    AspectRatio,
    Typography,
    Chip,
    Button,
    useTheme,
    Avatar,
    Box
} from '@mui/joy';
import {
    Calendar,
    Eye,
    MessageSquareText,
    Star,
    DollarSign,
    ShoppingCart,
    Dot
} from 'lucide-react';
import { type JSX } from 'react';
import type { CourseDto } from '../../services/course/course.dto';
import { formatDate } from '../../utils/dateUtils';
import { TRANSITION_DURATION } from '../../constants/ui.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendar,
    faEye,
    faMessage,
    faStar
} from '@fortawesome/free-solid-svg-icons';

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
                transition: `all ${TRANSITION_DURATION.NORMAL} ease`,
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
                    {/* Column 1: Hero Image */}
                    <Stack
                        sx={{
                            flexBasis: { xs: '100%', md: '40%' },
                            minWidth: 0
                        }}
                    >
                        <AspectRatio
                            ratio="16/10"
                            sx={{
                                borderRadius: theme.vars.radius.xl,
                                overflow: 'hidden',
                                height: '100%',
                                maxHeight: '400px',
                                '& img': {
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    transition: `transform ${TRANSITION_DURATION.NORMAL} ease`
                                },
                                '&:hover img': {
                                    transform: 'scale(1.05)'
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

                    {/* Column 2: Title, Author/Stats, Description */}
                    <Stack
                        spacing={1.5}
                        sx={{
                            flexBasis: { xs: '100%', md: '60%' },
                            minWidth: 0,
                            justifyContent: 'flex-start'
                        }}
                    >
                        <Typography
                            level="title-lg"
                            fontWeight={800}
                            sx={{
                                fontSize: {
                                    xs: '1.75rem',
                                    md: '2rem',
                                    lg: '2.25rem'
                                },
                                lineHeight: 1.2,
                                color: theme.vars.palette.text.primary
                            }}
                        >
                            {course.name}
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={0.5}
                            flexWrap="wrap"
                            useFlexGap
                            alignItems="center"
                        >
                            <Typography
                                level="body-sm"
                                fontWeight={500}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: theme.vars.palette.neutral[500]
                                }}
                                startDecorator={
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faStar}
                                        color={theme.vars.palette.yellow[400]}
                                    />
                                }
                            >
                                {course.rating?.toFixed(1) ?? '0.0'}
                            </Typography>
                            <Dot
                                size={20}
                                color={theme.vars.palette.neutral[400]}
                            />
                            <Typography
                                level="body-sm"
                                fontWeight={500}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: theme.vars.palette.neutral[500]
                                }}
                                startDecorator={
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faCalendar}
                                        color={theme.vars.palette.neutral[400]}
                                    />
                                }
                            >
                                {formatDate(course.createdAt)}
                            </Typography>
                            <Dot
                                size={20}
                                color={theme.vars.palette.neutral[400]}
                            />
                            <Typography
                                level="body-sm"
                                fontWeight={500}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: theme.vars.palette.neutral[500]
                                }}
                                startDecorator={
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faEye}
                                        color={theme.vars.palette.neutral[400]}
                                    />
                                }
                            >
                                {course.viewCount} views
                            </Typography>
                            <Dot
                                size={20}
                                color={theme.vars.palette.neutral[400]}
                            />
                            <Typography
                                level="body-sm"
                                fontWeight={500}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: theme.vars.palette.neutral[500]
                                }}
                                startDecorator={
                                    <FontAwesomeIcon
                                        size="sm"
                                        icon={faMessage}
                                        color={theme.vars.palette.neutral[400]}
                                    />
                                }
                            >
                                {course.commentCount} comments
                            </Typography>
                        </Stack>
                        <Stack
                            spacing={2}
                            paddingY={2}
                        >
                            <Typography
                                level="h3"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.vars.palette.danger[600]
                                }}
                            >
                                {`${course.price.toLocaleString('vi-VN')} VND`}
                            </Typography>
                            <Button
                                // onClick={handlePurchase}
                                // loading={isPurchasing}
                                startDecorator={<ShoppingCart size={16} />}
                                sx={{
                                    borderRadius: theme.vars.radius.md,
                                    alignSelf: 'flex-start'
                                }}
                            >
                                Purchase Course
                            </Button>
                        </Stack>
                        <AuthorSummary
                            avatarUrl={course.user?.avatarUrl}
                            username={course.user?.username}
                            firstName={course.user?.firstName}
                            lastName={course.user?.lastName}
                        />
                        <Typography
                            level="body-lg"
                            sx={{
                                color: 'var(--joy-palette-neutral-600)',
                                lineHeight: 1.6,
                                fontSize: {
                                    xs: '0.95rem',
                                    md: '1rem',
                                    lg: '1.05rem'
                                }
                            }}
                        >
                            {course.description}
                        </Typography>
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
        <Box>
            <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{
                    borderRadius: theme.vars.radius.lg,
                    bgcolor: 'neutral.50',
                    transition: `all ${TRANSITION_DURATION.FAST} ease`,
                    '&:hover': {
                        cursor: 'pointer'
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
                            color: theme.vars.palette.neutral[500],
                            fontWeight: 500
                        }}
                    >
                        {username && `@${username}`}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
}
