import { Stack, Typography } from '@mui/joy';
import type { JSX } from 'react';

export default function NavBar(): JSX.Element {
    return (
        <Stack
            direction={'row'}
            spacing={2}
            padding={2}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={1}
            >
                <img
                    src="src/assets/burger.png"
                    alt="https://www.flaticon.com/free-icons/burger"
                    width={32}
                    height={32}
                />
                <Typography
                    level={'h3'}
                    fontWeight={900}
                    textColor={'success.600'}
                >
                    Flavories
                </Typography>
            </Stack>
            <div>Links</div>
        </Stack>
    );
}
