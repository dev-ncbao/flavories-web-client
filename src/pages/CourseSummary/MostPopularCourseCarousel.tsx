import {
    Stack,
    Typography,
    CircularProgress,
    Alert,
    Box,
    Button,
    useTheme
} from '@mui/joy';
import { useEffect, useState, useMemo, type JSX } from 'react';
import { useNavigate } from 'react-router';
import type { CourseDto } from '../../services/course/course.dto';
import { courseService } from '../../services/course/course.service';
import { Info, List } from 'lucide-react';
import CourseCarousel from '../../components/CourseCarousel';

export default function MostPopularCourseCarousel(): JSX.Element {
    const theme = useTheme();
    const navigate = useNavigate();
    const [courses, setCourses] = useState<CourseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                const response = await courseService.getHotAllTime(20);

                // Add 0.5 second delay for loading state
                await new Promise((resolve) => setTimeout(resolve, 500));
                setCourses(response.data);
                setError(null);
            } catch (err) {
                setError(
                    'Failed to load popular courses. Please try again later.'
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
                        <Typography level="h2">Most Popular</Typography>
                        <Typography color="neutral">
                            Explore our community's all-time favorite courses
                        </Typography>
                    </Stack>
                    <Button
                        disabled={isButtonDisabled}
                        variant="outlined"
                        color="neutral"
                        startDecorator={<List size={18} />}
                        onClick={() => navigate('/course/discovery')}
                        sx={{
                            height: 40,
                            paddingX: 3,
                            borderRadius: theme.vars.radius.lg
                        }}
                    >
                        See All Popular Courses
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
                                There are no popular courses available at the
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

