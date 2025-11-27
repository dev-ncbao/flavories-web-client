export class RecipeMediaDto {
    id?: number;
    recipeId!: number;
    mediaTypeId!: number;
    url!: string;
    altText?: string;
    sortOrder?: number;
}
