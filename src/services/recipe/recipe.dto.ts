import type {
    Ingredient,
    Recipe,
    RecipeComment,
    RecipeIngredient,
    Unit,
    User
} from '../../types/types';

export type RecipeDto = Recipe & {
    user: Pick<
        User,
        'userId' | 'username' | 'avatarUrl' | 'firstName' | 'lastName'
    >;
} & {
    recipeIngredients: Pick<
        RecipeIngredient,
        'recipeId' | 'ingredientId' | 'amount'
    >[] & {
        ingredient: Pick<Ingredient, 'name'> & {
            unit: Pick<Unit, 'abbreviation'>;
        };
    };
} & {
    recipeComments: Pick<
        RecipeComment,
        'recipeCommentId' | 'comment' | 'createdAt'
    >[] & {
        user: Pick<User, 'username' | 'avatarUrl' | 'firstName' | 'lastName'>;
    };
};
