export class CommentDto {
    id?: number;
    content?: string;
    userId?: number;
    recipeId?: number;
    parentId?: number | null;
    likeCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
