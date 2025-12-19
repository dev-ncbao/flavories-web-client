import { Card, CardContent, Stack, Typography, useTheme, AspectRatio } from '@mui/joy';
import { Play } from 'lucide-react';
import type { JSX } from 'react';

interface CourseVideoCardProps {
    videoUrl: string;
    courseName: string;
}

export function CourseVideoCard({
    videoUrl,
    courseName
}: CourseVideoCardProps): JSX.Element {
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
                <Stack spacing={2}>
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
                        <Stack
                            sx={{
                                p: 1,
                                borderRadius: theme.vars.radius.lg,
                                bgcolor: 'primary.50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Play
                                size={20}
                                color={theme.vars.palette.primary[500]}
                            />
                        </Stack>
                        <Typography
                            level="title-lg"
                            fontWeight={700}
                            sx={{
                                fontSize: { xs: '1.25rem', md: '1.5rem' },
                                color: theme.vars.palette.text.primary
                            }}
                        >
                            Course Video
                        </Typography>
                    </Stack>

                    {/* Video Player */}
                    <AspectRatio
                        ratio="16/9"
                        sx={{
                            borderRadius: theme.vars.radius.lg,
                            overflow: 'hidden',
                            boxShadow: theme.vars.shadow.md,
                            border: `1px solid ${theme.vars.palette.divider}`
                        }}
                    >
                        <video
                            controls
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                backgroundColor: '#000'
                            }}
                        >
                            <source
                                src={videoUrl}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </AspectRatio>
                </Stack>
            </CardContent>
        </Card>
    );
}

