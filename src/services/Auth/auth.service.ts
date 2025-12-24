import axiosClient from '../../api/axiosClient';
import type { SignInRequest, SignInResponse, SignUpRequest } from './auth.dto';

export const authService = {
    signIn: (data: SignInRequest) =>
        axiosClient.post<SignInResponse>('/auth/login', data),
    signUp: (data: SignUpRequest) =>
        axiosClient.post('/auth/sign-up', data),
    adminSignIn: (data: SignInRequest) =>
        axiosClient.post<SignInResponse>('/admin/login', data)
};
