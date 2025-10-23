import axiosClient from '../../api/axiosClient';
import type { SignInRequest, SignInResponse } from './auth.dto';

export const authService = {
    signIn: (data: SignInRequest) =>
        axiosClient.post<SignInResponse>('/auth/login', data)
};
