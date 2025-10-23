import { Button, Stack, Typography } from '@mui/joy';
import type { JSX } from 'react';

export default function Discover(): JSX.Element {
    return (
        <Stack>
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
                        paddingX: 3
                    }}
                >
                    See All
                </Button>
            </Stack>
        </Stack>
    );
}
