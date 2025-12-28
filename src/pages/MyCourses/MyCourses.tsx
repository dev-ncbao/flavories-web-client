import {
    Box,
    Button,
    Card,
    CircularProgress,
    IconButton,
    Stack,
    Table,
    Typography,
    useTheme,
    Alert
} from '@mui/joy';
import { Edit, Trash2, AlertCircle } from 'lucide-react';
import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { courseService } from '../../services/course/course.service';
import type { CourseDto } from '../../services/course/course.dto';
import { formatDate } from '../../utils/dateUtils';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useAuth } from '../../hooks/useAuth';

export default function MyCourses(): JSX.Element {
    const theme = useTheme();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();
    const [courses, setCourses] = useState<CourseDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        if (user?.roleId !== 1) {
            navigate('/');
            return;
        }
        loadCourses();
    }, [user, navigate]);

    const loadCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await courseService.getUserCourses();
            setCourses(response.data);
        } catch (err) {
            setError('Failed to load courses. Please try again.');
            console.error('Error loading courses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (courseId: number) => {
        navigate(`/course/${courseId}/detail`);
    };

    const handleDelete = async (courseId: number) => {
        if (!confirm('Are you sure you want to delete this course?')) {
            return;
        }

        try {
            setDeletingId(courseId);
            await courseService.deleteCourse(courseId);
            enqueueSnackbar('Course deleted successfully', { variant: 'success' });
            setCourses(courses.filter((c) => c.courseId !== courseId));
        } catch (err) {
            enqueueSnackbar('Failed to delete course', { variant: 'error' });
            console.error('Error deleting course:', err);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '400px' }}
            >
                <CircularProgress size="lg" />
            </Stack>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert
                    color="danger"
                    startDecorator={<AlertCircle />}
                    sx={{ borderRadius: theme.vars.radius.lg }}
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Stack spacing={3} sx={{ p: 3 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography level="h2">My Courses</Typography>
                <Button
                    onClick={() => navigate('/course/create')}
                    size="lg"
                    sx={{ borderRadius: theme.vars.radius.lg }}
                >
                    Create New Course
                </Button>
            </Stack>

            {courses.length === 0 ? (
                <Card
                    variant="outlined"
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: theme.vars.radius.lg
                    }}
                >
                    <Typography level="body-lg" sx={{ color: 'neutral.500' }}>
                        You haven't created any courses yet.
                    </Typography>
                </Card>
            ) : (
                <Card
                    variant="outlined"
                    sx={{ borderRadius: theme.vars.radius.lg, overflow: 'auto' }}
                >
                    <Table
                        aria-label="My courses table"
                        stickyHeader
                        sx={{
                            '& thead th': {
                                backgroundColor: 'background.surface',
                                fontWeight: 'lg',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1
                            },
                            '& tbody tr:hover': {
                                backgroundColor: 'neutral.50'
                            }
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>ID</th>
                                <th style={{ width: '40%' }}>Name</th>
                                <th style={{ width: '25%' }}>Created Date</th>
                                <th style={{ width: '25%', textAlign: 'center' }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.courseId}>
                                    <td>
                                        <Typography level="body-md">
                                            {course.courseId}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography level="body-md" fontWeight="md">
                                            {course.name}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography level="body-md">
                                            {formatDate(course.createdAt)}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            justifyContent="center"
                                        >
                                            <IconButton
                                                variant="soft"
                                                color="primary"
                                                size="sm"
                                                onClick={() =>
                                                    handleEdit(course.courseId)
                                                }
                                                sx={{
                                                    borderRadius: theme.vars.radius.md
                                                }}
                                            >
                                                <Edit size={16} />
                                            </IconButton>
                                            <IconButton
                                                variant="soft"
                                                color="danger"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(course.courseId)
                                                }
                                                disabled={
                                                    deletingId === course.courseId
                                                }
                                                sx={{
                                                    borderRadius: theme.vars.radius.md
                                                }}
                                            >
                                                {deletingId === course.courseId ? (
                                                    <CircularProgress size="sm" />
                                                ) : (
                                                    <Trash2 size={16} />
                                                )}
                                            </IconButton>
                                        </Stack>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            )}
        </Stack>
    );
}

