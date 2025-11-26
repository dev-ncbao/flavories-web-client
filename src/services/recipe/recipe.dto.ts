export class RecipeDto {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    rating?: number;
    likeCount?: number;
    dislikeCount?: number;
    viewCount?: number;
    commentCount?: number;
    trendingScore?: number;
    // ranking?: number;
    createdAt?: Date;
}
