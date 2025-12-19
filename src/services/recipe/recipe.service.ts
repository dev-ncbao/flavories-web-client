import axiosClient from '../../api/axiosClient';
import type { PostCommentRequest, RecipeDto } from './recipe.dto';

export interface RecipeQueryParams {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    sortBy?: 'name' | 'trendingScore' | 'createdAt';
    sortOrder?: 'ASC' | 'DESC';
}

// Query params for fetching comments
export interface GetCommentsOptions {
    limit?: number;
    page?: number;
    recipeId?: number;
    userId?: number;
    parentId?: number | null;
}

export const recipeService = {
    // Unified endpoint for all recipe queries
    getRecipes: (params?: RecipeQueryParams) => {
        return axiosClient.get<RecipeDto[]>('/recipes', {
            params
        });
    },
    // Get recipe detail by ID
    getRecipeById: (id: number) => {
        return axiosClient.get<RecipeDto>(`/recipes/${id}`);
    },
    // Get top recipes for the current month
    getTopThisMonth: (limit = 20) => {
        return axiosClient.get<RecipeDto[]>('/recipes/top-month', {
            params: { limit }
        });
    },
    // Get newest recipes for the current month
    getNewestThisMonth: (limit = 20) => {
        return axiosClient.get<RecipeDto[]>('/recipes/new-month', {
            params: { limit }
        });
    },
    // Get hottest recipes of all time
    getHotAllTime: (limit = 20) => {
        return axiosClient.get<RecipeDto[]>('/recipes/hot-all', {
            params: { limit }
        });
    },
    postComment: (data: PostCommentRequest) => {
        return axiosClient.post<PostCommentRequest>('/recipe-comments', data);
    }
};
