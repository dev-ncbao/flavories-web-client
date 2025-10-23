import { Button } from '@mui/joy';
import type { JSX } from 'react';
import { useNavigate } from 'react-router';

export default function NotFound(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div>
            404 - Not Found:{' '}
            <Button
                onClick={() => {
                    navigate('/');
                }}
            >
                Go Home
            </Button>
        </div>
    );
}
