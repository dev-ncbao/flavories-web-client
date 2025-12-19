import type { Course, User } from '../../types/types';

export type CourseDto = Course & {
    user: Pick<
        User,
        'userId' | 'username' | 'avatarUrl' | 'firstName' | 'lastName'
    >;
};

export interface CourseQueryParams {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    sortBy?: 'name' | 'trendingScore' | 'createdAt';
    sortOrder?: 'ASC' | 'DESC';
}

