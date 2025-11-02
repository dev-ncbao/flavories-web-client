import { Box, Button, Stack, Typography, useTheme } from '@mui/joy';
import type { JSX } from 'react';

export default function HeroSection(): JSX.Element {
    const theme = useTheme();

    return (
        <Stack
            direction={'row'}
            alignItems={'center'}
            alignSelf={'center'}
            width={'100%'}
            sx={{
                overflowX: 'visible',
                paddingInline: 8,
                scrollbarWidth: 'none'
            }}
        >
            <div
                style={{
                    flexBasis: '50%'
                }}
            >
                <Typography
                    level="h1"
                    fontSize={72}
                >
                    Cooking Made Fun and Easy: Unleash Your Inner Chef
                </Typography>
                <Box height={16}></Box>
                <Typography
                    level="body-md"
                    color="neutral"
                    sx={{
                        width: '80%'
                    }}
                >
                    Discover more than{' '}
                    <Typography color="primary">10,000 recipes</Typography> in
                    your hand with the best recipe. Help you to find the easiest
                    way to cook.
                </Typography>
                <Box height={48}></Box>
                <Button
                    size="lg"
                    sx={{
                        height: 56,
                        paddingX: 4,
                        borderRadius: theme.vars.radius.lg
                    }}
                >
                    Explore Recipes
                </Button>
            </div>
            <div>
                <img
                    src="/src/assets/hero.png"
                    alt="Delicious food"
                    style={{
                        position: 'relative',
                        width: 450,
                        transform: 'scale(2) translateX(50px)',
                        zIndex: -1
                    }}
                />
            </div>
        </Stack>
    );
}
