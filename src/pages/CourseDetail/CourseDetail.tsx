import { Stack, IconButton, Box, useTheme } from '@mui/joy';
import { useEffect, useState, useRef, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowUp } from 'lucide-react';
import { courseService } from '../../services/course/course.service';
import type { CourseDto } from '../../services/course/course.dto';
import { CourseHeroCard } from './CourseHeroCard';
import { CourseVideoCard } from './CourseVideoCard';
import { CourseIngredientCard } from './CourseIngredientCard';
import { CourseStepsCard } from './CourseStepsCard';
import { CourseCommentsCard } from './CourseCommentsCard';
import BackLink from '../../components/BackLink';

export default function CourseDetail(): JSX.Element {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const theme = useTheme();
    const commentsRef = useRef<HTMLDivElement>(null);

    const [course, setCourse] = useState<CourseDto>({} as CourseDto);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await courseService.getCourseById(Number(id));
                setCourse(response.data);
            } catch {
                // Error handling
            }
        };

        fetchCourse();
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY =
                window.scrollY || document.documentElement.scrollTop;
            setShowScrollToTop(scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCommentAdded = async () => {
        try {
            const response = await courseService.getCourseById(Number(id));
            setCourse(response.data);
        } catch {
            // Error handling
        }
    };

    const scrollToComments = () => {
        commentsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Stack
            spacing={3}
            sx={{ px: { xs: 2, md: 6 }, py: 4 }}
        >
            <BackLink onBack={() => navigate(-1)} />
            <CourseHeroCard
                course={course}
                onCommentClick={scrollToComments}
            />
            {course.videoUrl && (
                <CourseVideoCard
                    videoUrl={course.videoUrl}
                    courseName={course.name}
                />
            )}
            <CourseIngredientCard
                courseIngredients={course.courseIngredients || []}
            />
            <CourseStepsCard courseSteps={course.courseSteps || []} />
            <div ref={commentsRef}>
                <CourseCommentsCard
                    courseComments={course.courseComments || []}
                    courseId={course.courseId}
                    onCommentAdded={handleCommentAdded}
                />
            </div>

            {/* Scroll to Top Button */}
            {showScrollToTop && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 24, md: 32 },
                        right: { xs: 24, md: 32 },
                        zIndex: 1000
                    }}
                >
                    <IconButton
                        onClick={scrollToTop}
                        size="lg"
                        sx={{
                            borderRadius: theme.vars.radius.xl,
                            bgcolor: 'primary.500',
                            color: 'white',
                            boxShadow: theme.vars.shadow.lg,
                            width: { xs: 48, md: 56 },
                            height: { xs: 48, md: 56 },
                            '&:hover': {
                                color: 'white',
                                bgcolor: 'primary.600',
                                boxShadow: theme.vars.shadow.xl,
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={24} />
                    </IconButton>
                </Box>
            )}
        </Stack>
    );
}

