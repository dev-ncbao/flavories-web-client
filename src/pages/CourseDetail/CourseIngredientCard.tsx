import { Card, CardContent, Stack, Typography, useTheme, Box } from '@mui/joy';
import { ShoppingBasket } from 'lucide-react';
import type { JSX } from 'react';
import type { CourseIngredientDto } from '../../services/course/course.dto';

export function CourseIngredientCard({
    courseIngredients
}: {
    courseIngredients: CourseIngredientDto[];
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
                            {courseIngredients.length} items
                        </Typography>
                    </Stack>

                    {/* Ingredients List */}
                    <Stack spacing={1.5}>
                        {courseIngredients.length === 0 ? (
                            <Typography
                                level="body-md"
                                sx={{
                                    color: 'var(--joy-palette-neutral-500)',
                                    textAlign: 'center',
                                    py: 2
                                }}
                            >
                                No ingredients listed for this course.
                            </Typography>
                        ) : (
                            courseIngredients.map((ingredient, index) => (
                                <Box
                                    key={index}
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
                                                {parseFloat(ingredient.amount).toLocaleString('vi-VN', {
                                                    maximumFractionDigits: 2,
                                                    minimumFractionDigits: 0
                                                })}
                                            </Typography>
                                            {ingredient.ingredient?.unit
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
                                                        ingredient.ingredient
                                                            .unit.abbreviation
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
                                            {ingredient.ingredient?.name || 'Unknown ingredient'}
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

