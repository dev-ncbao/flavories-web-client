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
import type { CourseDto } from '../../services/course/course.dto';
import { courseService } from '../../services/course/course.service';
import { Info, List } from 'lucide-react';
import CourseCarousel from '../../components/CourseCarousel';

export default function TrendingCourseCarousel(): JSX.Element {
    const theme = useTheme();
    const navigate = useNavigate();

    const [courses, setCourses] = useState<CourseDto[]>([]);
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
        () => !loading && !error && courses.length === 0,
        [loading, error, courses.length]
    );

    const hasCourses = useMemo(
        () => !loading && !error && courses.length > 0,
        [loading, error, courses.length]
    );

    const isButtonDisabled = useMemo(
        () => !!error || isEmpty,
        [error, isEmpty]
    );

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                const response = await courseService.getTopThisMonth(20);

                // Add 0.5 second delay for loading state
                await new Promise((resolve) => setTimeout(resolve, 500));
                setCourses(response.data);
                setError(null);
            } catch (err) {
                setError(
                    'Failed to load trending courses. Please try again later.'
                );
                console.error('Error fetching courses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
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
                            Discover this month's hottest courses loved by our
                            community
                        </Typography>
                    </Stack>
                    <Button
                        disabled={isButtonDisabled}
                        variant="outlined"
                        color="neutral"
                        startDecorator={<List size={18} />}
                        onClick={() =>
                            navigate('/course/discovery', {
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
                        View All Trending Courses This Month
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
                                There is no trending course available at the
                                moment.
                            </Typography>
                        </div>
                    </Alert>
                )}

                {hasCourses && (
                    <CourseCarousel
                        courses={courses}
                        showRank
                    />
                )}
            </Stack>
        </Stack>
    );
}

