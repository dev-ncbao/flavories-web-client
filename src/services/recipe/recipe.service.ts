import axiosClient from '../../api/axiosClient';
import type { RecipeDto } from './recipe.dto';

export const recipeService = {
    getRecipes: () => axiosClient.get<RecipeDto[]>('/recipes'),
    getTrendingRecipes: (limit?: number) =>
        axiosClient.get<RecipeDto[]>('/recipes/trending', {
            params: { limit }
        }),
    getNewRecipesThisMonth: (limit?: number) =>
        axiosClient.get<RecipeDto[]>('/recipes/new', {
            params: { limit }
        }),
    getMostPopularRecipes: (limit?: number) =>
        axiosClient.get<RecipeDto[]>('/recipes/popular', {
            params: { limit }
        })
};
