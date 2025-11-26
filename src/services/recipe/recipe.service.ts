import axiosClient from '../../api/axiosClient';
import type { RecipeDto } from './recipe.dto';

export interface RecipeQueryParams {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
    sortBy?: 'name' | 'trendingScore' | 'createdAt';
    sortOrder?: 'ASC' | 'DESC';
}

export const recipeService = {
    // Unified endpoint for all recipe queries
    getRecipes: (params?: RecipeQueryParams) => {
        return axiosClient.get<RecipeDto[]>('/recipes', {
            params
        });
    }
};
