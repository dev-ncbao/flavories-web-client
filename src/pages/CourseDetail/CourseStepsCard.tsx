import { Card, CardContent, Stack, Typography, useTheme, Box } from '@mui/joy';
import { ChefHat } from 'lucide-react';
import type { JSX } from 'react';
import type { CourseStepDto } from '../../services/course/course.dto';

export function CourseStepsCard({
    courseSteps
}: {
    courseSteps: CourseStepDto[];
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
                            Course Steps
                        </Typography>
                        <Typography
                            level="body-sm"
                            sx={{
                                color: 'var(--joy-palette-neutral-600)',
                                fontWeight: 500,
                                ml: 'auto'
                            }}
                        >
                            {courseSteps.length} steps
                        </Typography>
                    </Stack>

                    {/* Steps List */}
                    <Stack spacing={2}>
                        {courseSteps.length === 0 ? (
                            <Typography
                                level="body-md"
                                sx={{
                                    color: 'var(--joy-palette-neutral-500)',
                                    textAlign: 'center',
                                    py: 2
                                }}
                            >
                                No steps listed for this course.
                            </Typography>
                        ) : (
                            courseSteps
                                .sort((a, b) => a.stepNumber - b.stepNumber)
                                .map((step) => (
                                    <Box
                                        key={step.stepNumber}
                                        sx={{
                                            p: 2,
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
                                            alignItems="flex-start"
                                        >
                                            {/* Step Number Badge */}
                                            <Box
                                                sx={{
                                                    minWidth: 40,
                                                    height: 40,
                                                    borderRadius: '50%',
                                                    bgcolor: 'primary.500',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 700,
                                                    fontSize: '1rem',
                                                    flexShrink: 0,
                                                    boxShadow: theme.vars.shadow.sm
                                                }}
                                            >
                                                {step.stepNumber}
                                            </Box>

                                            {/* Step Description */}
                                            <Typography
                                                level="body-md"
                                                sx={{
                                                    color: theme.vars.palette.text
                                                        .primary,
                                                    lineHeight: 1.6,
                                                    flex: 1,
                                                    pt: 0.5,
                                                    fontSize: {
                                                        xs: '0.9rem',
                                                        md: '0.95rem'
                                                    }
                                                }}
                                            >
                                                {step.description}
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

