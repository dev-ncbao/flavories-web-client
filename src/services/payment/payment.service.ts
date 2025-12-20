import axiosClient from '../../api/axiosClient';
import type {
    PaymentRequest,
    PaymentResponse,
    PaymentStatusQueryParams,
    PaymentStatusResponse,
    CoursePurchaseStatusResponse
} from './payment.dto';

export const paymentService = {
    purchaseCourse: (data: PaymentRequest) =>
        axiosClient.post<PaymentResponse>('/payment/course', data),
    checkStatus: (params: PaymentStatusQueryParams) =>
        axiosClient.get<PaymentStatusResponse>('/payment/check-status', {
            params
        }),
    getPurchaseStatus: (courseId: number) =>
        axiosClient.get<CoursePurchaseStatusResponse>(
            `/payment/course/${courseId}/purchase-status`
        )
};

