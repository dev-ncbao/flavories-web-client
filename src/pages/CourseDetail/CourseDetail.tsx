import { Stack, Alert, Button, Typography, useTheme } from '@mui/joy';
import { useEffect, useState, useRef, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Lock, ShoppingCart } from 'lucide-react';
import { courseService } from '../../services/course/course.service';
import type { CourseDto } from '../../services/course/course.dto';
import { CourseHeroCard } from './CourseHeroCard';
import { CourseVideoCard } from './CourseVideoCard';
import { CourseIngredientCard } from './CourseIngredientCard';
import { CourseStepsCard } from './CourseStepsCard';
import { CourseCommentsCard } from './CourseCommentsCard';
import BackLink from '../../components/BackLink';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useAsyncData } from '../../hooks/useAsyncData';
import { paymentService } from '../../services/payment/payment.service';
import { scrollToElement } from '../../utils/scrollUtils';

export default function CourseDetail(): JSX.Element {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const theme = useTheme();
    const commentsRef = useRef<HTMLDivElement>(null);
    const { isLoggedIn } = useAuth();
    const { openSnackbar } = useSnackbar();
    const showScrollToTop = useScrollToTop();

    const { data: course, refetch } = useAsyncData<CourseDto>({
        fetchFn: () => courseService.getCourseById(Number(id)),
        dependencies: [id]
    });

    const [hasPurchased, setHasPurchased] = useState(false);
    const [isCheckingPurchase, setIsCheckingPurchase] = useState(true);
    const [isPurchasing, setIsPurchasing] = useState(false);

    useEffect(() => {
        const checkPurchaseStatus = async () => {
            if (!isLoggedIn || !course?.courseId) {
                setIsCheckingPurchase(false);
                setHasPurchased(false);
                return;
            }

            try {
                setIsCheckingPurchase(true);
                const response = await paymentService.getPurchaseStatus(
                    course.courseId
                );
                setHasPurchased(response.data.hasPurchased);
            } catch {
                // If error, assume not purchased
                setHasPurchased(false);
            } finally {
                setIsCheckingPurchase(false);
            }
        };

        checkPurchaseStatus();
    }, [isLoggedIn, course?.courseId]);

    const handleCommentAdded = async () => {
        await refetch();
    };

    const scrollToComments = () => {
        scrollToElement(commentsRef.current);
    };

    const handlePurchase = async () => {
        if (!isLoggedIn) {
            openSnackbar('Please sign in to purchase this course', 'warning');
            navigate('/sign-in');
            return;
        }

        if (!course?.courseId) {
            openSnackbar('Course information not available', 'danger');
            return;
        }

        try {
            setIsPurchasing(true);
            const response = await paymentService.purchaseCourse({
                courseId: course?.courseId || 0
            });
            
            if (response.data.checkoutUrl) {
                // Navigate to checkout URL
                window.location.href = response.data.checkoutUrl;
            } else {
                openSnackbar(
                    'Checkout URL not available. Please try again.',
                    'danger'
                );
                setIsPurchasing(false);
            }
        } catch (err: unknown) {
            const errorMessage =
                (err as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message ||
                'Failed to initiate purchase. Please try again.';
            openSnackbar(errorMessage, 'danger');
            setIsPurchasing(false);
        }
    };

    if (!course) {
        return <div>Loading...</div>;
    }

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
            
            {/* Purchase Alert - Show if not purchased */}
            {!isCheckingPurchase && !hasPurchased && (
                <Alert
                    variant="soft"
                    color="warning"
                    startDecorator={<Lock size={20} />}
                    sx={{
                        borderRadius: theme.vars.radius.xl,
                        alignItems: 'flex-start'
                    }}
                >
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        <div>
                            <Typography
                                level="title-md"
                                fontWeight={700}
                                sx={{ mb: 1 }}
                            >
                                Purchase Required
                            </Typography>
                            <Typography level="body-sm">
                                To watch the video, view ingredients, and see
                                the cooking steps, please purchase this course.
                            </Typography>
                        </div>
                        <Button
                            onClick={handlePurchase}
                            loading={isPurchasing}
                            startDecorator={<ShoppingCart size={16} />}
                            sx={{
                                borderRadius: theme.vars.radius.md,
                                alignSelf: 'flex-start'
                            }}
                        >
                            Purchase Course
                        </Button>
                    </Stack>
                </Alert>
            )}

            {/* Show content only if purchased */}
            {hasPurchased && (
                <>
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
                </>
            )}
            <div ref={commentsRef}>
                <CourseCommentsCard
                    courseComments={course.courseComments || []}
                    courseId={course.courseId}
                    onCommentAdded={handleCommentAdded}
                />
            </div>
            <ScrollToTopButton show={showScrollToTop} />
        </Stack>
    );
}

