import { Button, Stack, Typography, useTheme } from '@mui/joy';
import type { JSX } from 'react';

export default function Discover(): JSX.Element {
    const theme = useTheme();

    return (
        <Stack
            sx={{
                paddingInline: 8
            }}
        >
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
            >
                <Stack>
                    <Typography level="h2">Discover, Create, Share</Typography>
                    <Typography color="neutral">
                        Check our most popular recipes of this week
                    </Typography>
                </Stack>
                <Button
                    size="md"
                    sx={{
                        height: 40,
                        paddingX: 3,
                        borderRadius: theme.vars.radius.lg
                    }}
                >
                    See All
                </Button>
            </Stack>
        </Stack>
    );
}
