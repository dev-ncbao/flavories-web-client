import axiosClient from '../../api/axiosClient';
import type { IngredientDto, CreateIngredientRequest } from './ingredient.dto';

export const ingredientService = {
    getIngredients: () => {
        return axiosClient.get<IngredientDto[]>('/ingredients');
    },
    createIngredient: (data: CreateIngredientRequest) => {
        return axiosClient.post<IngredientDto>('/ingredients', data);
    }
};

