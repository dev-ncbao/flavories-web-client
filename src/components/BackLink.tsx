import { Link, Typography } from '@mui/joy';
import { ChevronLeft } from 'lucide-react';
import type { JSX } from 'react';

export default function BackLink({
    onBack
}: {
    onBack: () => void;
}): JSX.Element {
    return (
        <Link
            startDecorator={<ChevronLeft />}
            variant="plain"
            color="success"
            padding={0}
            onClick={onBack}
            sx={{
                cursor: 'pointer',
                alignSelf: 'flex-start'
            }}
        >
            <Typography
                level="body-sm"
                color="success"
                fontWeight={600}
            >
                Back
            </Typography>
        </Link>
    );
}
