import type { Recipe, User } from '../../types/types';

export type RecipeDto = Recipe & {
    user: Pick<
        User,
        'userId' | 'username' | 'avatarUrl' | 'firstName' | 'lastName'
    >;
    recipeIngredients: RecipeIngredientDto[];
    recipeComments: RecipeCommentDto[];
    recipeSteps: RecipeStepDto[];
};

export interface RecipeIngredientDto {
    recipeId: number;
    ingredientId: number;
    amount: number;
    ingredient: {
        name: string;
        unit: { abbreviation: string };
    };
}

export interface RecipeStepDto {
    stepNumber: number;
    description: string;
}

export interface RecipeCommentDto {
    recipeCommentId: number;
    comment: string;
    createdAt: Date;
    user: {
        username: string;
        avatarUrl: string;
        firstName: string;
        lastName: string;
    };
}

export interface PostCommentRequest {
    recipeId: number;
    userId: number;
    comment: string;
}

export interface CreateRecipeRequest {
    userId: number;
    name: string;
    description: string;
    thumbnailUrl: string;
    ingredients: {
        ingredientId: number;
        amount: number;
        ingredientName: string;
        unit: {
            unitId: number;
            abbreviation: string;
        }
    }[];
    steps: {
        stepNumber: number;
        description: string;
    }[];
}