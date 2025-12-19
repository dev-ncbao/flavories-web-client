export interface Recipe {
    recipeId: number;
    userId: number;
    name: string;
    description: string;
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    thumbnailUrl: string;
    linkedCourseId?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    userId: number;
    genderId: number;
    roleId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    avatarUrl: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Unit {
    unitId: number;
    name: string;
    abbreviation: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Ingredient {
    ingredientId: number;
    name: string;
    unitId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface RecipeIngredient {
    recipeId: number;
    ingredientId: number;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface RecipeComment {
    recipeCommentId: number;
    userId: number;
    recipeId: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}
