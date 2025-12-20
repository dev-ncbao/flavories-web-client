export interface PaymentRequest {
    courseId: number;
}

export interface PaymentResponse {
    success: boolean;
    message?: string;
    transactionId?: string;
    checkoutUrl: string;
}

export interface PaymentDto {
    paymentId: number;
    courseId: number;
    userId: number;
    amount: string;
    orderCode: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface PaymentStatusResponse {
    isSuccess: boolean;
    status: string;
    payment: PaymentDto;
}

export interface PaymentStatusQueryParams {
    courseId: number;
    orderCode: number;
}

export interface CoursePurchaseStatusResponse {
    hasPurchased: boolean;
    payment: PaymentDto;
}

