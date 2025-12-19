import { Card, CardContent, Stack, Typography, useTheme, Box } from '@mui/joy';
import { ChefHat } from 'lucide-react';
import type { JSX } from 'react';

interface RecipeStep {
    stepNumber: number;
    description: string;
}

export function RecipeStepsCard({
    recipeSteps
}: {
    recipeSteps: RecipeStep[];
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
                            <ChefHat
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
                            Instructions
                        </Typography>
                        <Typography
                            level="body-sm"
                            sx={{
                                color: 'var(--joy-palette-neutral-600)',
                                fontWeight: 500,
                                ml: 'auto'
                            }}
                        >
                            {recipeSteps.length} steps
                        </Typography>
                    </Stack>

                    {/* Steps List */}
                    <Stack spacing={2}>
                        {recipeSteps.length === 0 ? (
                            <Typography
                                level="body-md"
                                sx={{
                                    color: 'var(--joy-palette-neutral-500)',
                                    textAlign: 'center',
                                    py: 2
                                }}
                            >
                                No instructions available
                            </Typography>
                        ) : (
                            recipeSteps.map((step, index) => (
                                <Box
                                    key={`step-${step.stepNumber}-${index}`}
                                    sx={{
                                        position: 'relative',
                                        pl: { xs: 4, md: 5 }
                                    }}
                                >
                                    {/* Step Number Badge */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            width: { xs: 32, md: 40 },
                                            height: { xs: 32, md: 40 },
                                            borderRadius: theme.vars.radius.lg,
                                            bgcolor: 'primary.500',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: theme.vars.shadow.md,
                                            border: `2px solid ${theme.vars.palette.background.surface}`
                                        }}
                                    >
                                        <Typography
                                            level="title-sm"
                                            fontWeight={700}
                                            sx={{
                                                fontSize: {
                                                    xs: '0.875rem',
                                                    md: '1rem'
                                                },
                                                color: 'white'
                                            }}
                                        >
                                            {step.stepNumber}
                                        </Typography>
                                    </Box>

                                    {/* Step Description */}
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: theme.vars.radius.lg,
                                            bgcolor: 'neutral.50',
                                            border: `1px solid ${theme.vars.palette.divider}`,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                borderColor:
                                                    theme.vars.palette.primary[
                                                        300
                                                    ],
                                                bgcolor: 'primary.50',
                                                transform: 'translateX(4px)'
                                            }
                                        }}
                                    >
                                        <Typography
                                            level="body-lg"
                                            sx={{
                                                color: theme.vars.palette.text
                                                    .primary,
                                                lineHeight: 1.6,
                                                fontSize: {
                                                    xs: '0.95rem',
                                                    md: '1rem'
                                                }
                                            }}
                                        >
                                            {step.description ||
                                                'No description provided'}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

