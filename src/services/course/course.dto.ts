import type { Course, User } from '../../types/types';

export type CourseDto = Course & {
    user: Pick<
        User,
        'userId' | 'username' | 'avatarUrl' | 'firstName' | 'lastName'
    >;
    courseComments: CourseCommentDto[];
    courseIngredients: CourseIngredientDto[];
    courseSteps: CourseStepDto[];
};

export interface CourseIngredientDto {
    amount: string;
    ingredient: {
        name: string;
        unit: {
            abbreviation: string;
        };
    };
}

export interface CourseStepDto {
    stepNumber: number;
    description: string;
}

export interface CourseCommentDto {
    courseCommentId: number;
    comment: string;
    createdAt: Date;
    user: {
        username: string;
        avatarUrl: string;
        firstName: string;
        lastName: string;
    };
}

export interface PostCourseCommentRequest {
    courseId: number;
    userId: number;
    comment: string;
}

export interface CourseQueryParams {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    sortBy?: 'name' | 'trendingScore' | 'createdAt';
    sortOrder?: 'ASC' | 'DESC';
}

export interface CreateCourseRequest {
    userId: number;
    name: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    price: number;
    ingredients: {
        ingredientId: number;
        amount: number;
        ingredientName: string;
        unit: {
            unitId: number;
            abbreviation: string;
        };
    }[];
    steps: {
        stepNumber: number;
        description: string;
    }[];
}

