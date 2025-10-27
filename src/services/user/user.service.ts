import axiosClient from '../../api/axiosClient';
import type { UserDto } from './user.dto';

export const userService = {
    profile: () => axiosClient.get<UserDto>('/users/profile')
};
