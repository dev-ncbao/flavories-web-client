import axiosClient from '../../api/axiosClient';
import type { CourseDto, CourseQueryParams } from './course.dto';

export const courseService = {
    // Unified endpoint for all course queries
    getCourses: (params?: CourseQueryParams) => {
        return axiosClient.get<CourseDto[]>('/courses', {
            params
        });
    },
    // Get course detail by ID
    getCourseById: (id: number) => {
        return axiosClient.get<CourseDto>(`/courses/${id}`);
    },
    // Get top courses for the current month
    getTopThisMonth: (limit = 20) => {
        return axiosClient.get<CourseDto[]>('/courses/top-month', {
            params: { limit }
        });
    },
    // Get newest courses for the current month
    getNewestThisMonth: (limit = 20) => {
        return axiosClient.get<CourseDto[]>('/courses/new-month', {
            params: { limit }
        });
    },
    // Get hottest courses of all time
    getHotAllTime: (limit = 20) => {
        return axiosClient.get<CourseDto[]>('/courses/hot-all', {
            params: { limit }
        });
    }
};

