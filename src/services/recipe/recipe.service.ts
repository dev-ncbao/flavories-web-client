import axiosClient from '../../api/axiosClient';
import type { RecipeDto } from './recipe.dto';

export const recipeService = {
    getRecipes: () => axiosClient.get<RecipeDto[]>('/recipes')
};
