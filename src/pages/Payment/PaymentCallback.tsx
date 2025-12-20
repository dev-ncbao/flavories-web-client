import { useEffect, type JSX } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router';
import { useSnackbar } from '../../hooks/useSnackbar';
import { paymentService } from '../../services/payment/payment.service';

export default function PaymentCallback(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { openSnackbar } = useSnackbar();

    useEffect(() => {
        const handlePaymentCallback = async () => {
            const courseIdParam = searchParams.get('courseId');
            const orderCodeParam = searchParams.get('orderCode');
            
            if (!courseIdParam || !orderCodeParam) {
                openSnackbar('Missing payment information. Please contact support.', 'danger');
                navigate('/course/summary');
                return;
            }

            const courseId = Number(courseIdParam);
            const orderCode = Number(orderCodeParam);
            const isSuccessRoute = location.pathname.includes('/payment/success');

            try {
                // Check payment status using checkStatus API
                const response = await paymentService.checkStatus({
                    courseId,
                    orderCode
                });
                
                if (response.data.isSuccess && response.data.status === 'PAID') {
                    // Payment is successful
                    openSnackbar('Course purchased successfully!', 'success');
                } else {
                    // Payment failed or was cancelled
                    if (isSuccessRoute) {
                        openSnackbar('Payment verification failed. Please contact support if you have been charged.', 'warning');
                    } else {
                        openSnackbar('Payment was cancelled. No charges were made.', 'warning');
                    }
                }
            } catch {
                // Error checking payment status
                if (isSuccessRoute) {
                    openSnackbar('Unable to verify payment. Please contact support if you have been charged.', 'warning');
                } else {
                    openSnackbar('Payment was cancelled.', 'warning');
                }
            }

            // Redirect to course detail page
            navigate(`/course/${courseId}/detail`);
        };

        handlePaymentCallback();
    }, [searchParams, location.pathname, navigate, openSnackbar]);

    // Return empty fragment since we redirect immediately
    return <></>;
}

