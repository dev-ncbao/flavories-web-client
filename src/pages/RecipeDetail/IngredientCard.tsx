import { Card, CardContent, Stack, Typography, useTheme, Box } from '@mui/joy';
import { ShoppingBasket } from 'lucide-react';
import type { JSX } from 'react';

interface RecipeIngredient {
    recipeId: number;
    ingredientId: number;
    amount: number;
    ingredient: {
        name: string;
        unit: { abbreviation: string };
    };
}

export function IngredientCard({
    recipeIngredients
}: {
    recipeIngredients: RecipeIngredient[];
}): JSX.Element {
    const theme = useTheme();

    return (
        <Card
            variant="outlined"
            sx={{
                borderRadius: theme.vars.radius.xl,
                boxShadow: theme.vars.shadow.lg,
                overflow: 'hidden',
                border: `1px solid ${theme.vars.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: theme.vars.shadow.xl
                }
            }}
        >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={2.5}>
                    {/* Header */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{
                            pb: 1.5,
                            borderBottom: `1px solid ${theme.vars.palette.divider}`
                        }}
                    >
                        <Box
                            sx={{
                                p: 1,
                                borderRadius: theme.vars.radius.lg,
                                bgcolor: 'primary.50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ShoppingBasket
                                size={20}
                                color={theme.vars.palette.primary[500]}
                            />
                        </Box>
                        <Typography
                            level="title-lg"
                            fontWeight={700}
                            sx={{
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                color: theme.vars.palette.text.primary
                            }}
                        >
                            Ingredients
                        </Typography>
                        <Typography
                            level="body-sm"
                            sx={{
                                color: 'var(--joy-palette-neutral-600)',
                                fontWeight: 500,
                                ml: 'auto'
                            }}
                        >
                            {recipeIngredients.length} items
                        </Typography>
                    </Stack>

                    {/* Ingredients List */}
                    <Stack spacing={1.5}>
                        {recipeIngredients.length === 0 ? (
                            <Typography
                                level="body-md"
                                sx={{
                                    color: 'var(--joy-palette-neutral-500)',
                                    textAlign: 'center',
                                    py: 2
                                }}
                            >
                                No ingredients listed
                            </Typography>
                        ) : (
                            recipeIngredients.map((recipeIngredient, index) => (
                                <Box
                                    key={`${recipeIngredient.recipeId}-${recipeIngredient.ingredientId}-${index}`}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: theme.vars.radius.lg,
                                        bgcolor: 'neutral.50',
                                        border: `1px solid ${theme.vars.palette.divider}`,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            borderColor:
                                                theme.vars.palette.primary[300],
                                            bgcolor: 'primary.50',
                                            transform: 'translateX(4px)'
                                        }
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                    >
                                        {/* Amount Badge */}
                                        <Box
                                            sx={{
                                                minWidth: 60,
                                                textAlign: 'right',
                                                px: 1.5,
                                                py: 0.75,
                                                borderRadius:
                                                    theme.vars.radius.md,
                                                bgcolor: 'background.surface',
                                                border: `1px solid ${theme.vars.palette.divider}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end'
                                            }}
                                        >
                                            <Typography
                                                level="body-md"
                                                fontWeight={600}
                                                sx={{
                                                    color: theme.vars.palette
                                                        .text.primary
                                                }}
                                            >
                                                {recipeIngredient.amount}
                                            </Typography>
                                            {recipeIngredient.ingredient?.unit
                                                ?.abbreviation && (
                                                <Typography
                                                    level="body-sm"
                                                    sx={{
                                                        color: 'var(--joy-palette-neutral-600)',
                                                        ml: 0.5,
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {
                                                        recipeIngredient
                                                            .ingredient.unit
                                                            .abbreviation
                                                    }
                                                </Typography>
                                            )}
                                        </Box>

                                        {/* Ingredient Name */}
                                        <Typography
                                            level="body-lg"
                                            sx={{
                                                flex: 1,
                                                color: theme.vars.palette.text
                                                    .primary,
                                                fontWeight: 500
                                            }}
                                        >
                                            {recipeIngredient.ingredient
                                                ?.name || 'Unknown ingredient'}
                                        </Typography>
                                    </Stack>
                                </Box>
                            ))
                        )}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
