import axiosClient from '../../api/axiosClient';
import type { RecipeDto } from './recipe.dto';

export interface TrendingRecipesParams {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    sortBy?: 'name' | 'trendingScore' | 'createdAt';
    sortOrder?: 'ASC' | 'DESC';
}

export const recipeService = {
    getRecipes: () => axiosClient.get<RecipeDto[]>('/recipes'),
    getTrendingRecipes: (params?: TrendingRecipesParams | number) => {
        // Support both old signature (limit as number) and new signature (params object)
        const queryParams = typeof params === 'number' 
            ? { limit: params }
            : params;
        return axiosClient.get<RecipeDto[]>('/recipes/trending', {
            params: queryParams
        });
    },
    getNewRecipesThisMonth: (limit?: number) =>
        axiosClient.get<RecipeDto[]>('/recipes/new', {
            params: { limit }
        }),
    getMostPopularRecipes: (limit?: number) =>
        axiosClient.get<RecipeDto[]>('/recipes/popular', {
            params: { limit }
        })
};
