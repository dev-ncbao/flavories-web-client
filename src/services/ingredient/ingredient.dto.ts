import type { UnitDto } from '../unit/unit.dto';

export interface IngredientDto {
    ingredientId: number;
    unitId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    unit: UnitDto;
}

export interface CreateIngredientRequest {
    name: string;
    unitId: number;
}

