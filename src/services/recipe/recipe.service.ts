import axiosClient from '../../api/axiosClient';
import type { CommentDto as RecipeCommentDto } from './recipe-comment.dto';
import type { RecipeMediaDto } from './recipe-media.dto';
import type { RecipeDto } from './recipe.dto';

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
    // Get comments for a recipe
    getRecipeComments: (options?: GetCommentsOptions) => {
        return axiosClient.get<RecipeCommentDto[]>('/comments', {
            params: options
        });
    },
    // Get media for a recipe by ID
    getRecipeMedia: (recipeId: number) => {
        return axiosClient.get<RecipeMediaDto[]>(
            `/recipe-media/recipe/${recipeId}`
        );
    }
};
