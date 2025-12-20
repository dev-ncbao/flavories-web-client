import axiosClient from '../../api/axiosClient';
import type {
    AdminSignInRequest,
    AdminSignInResponse
} from './admin.dto';

export const adminService = {
    signIn: (data: AdminSignInRequest) =>
        axiosClient.post<AdminSignInResponse>('/admin/auth/login', data)
};

