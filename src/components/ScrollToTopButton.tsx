import { Box, IconButton, useTheme } from '@mui/joy';
import { ArrowUp } from 'lucide-react';
import { type JSX } from 'react';
import { scrollToTop } from '../utils/scrollUtils';
import { SPACING, Z_INDEX, TRANSITION_DURATION } from '../constants/ui.constants';

interface ScrollToTopButtonProps {
    show: boolean;
}

export default function ScrollToTopButton({
    show
}: ScrollToTopButtonProps): JSX.Element | null {
    const theme = useTheme();

    if (!show) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: { xs: SPACING.LG, md: SPACING.XL },
                right: { xs: SPACING.LG, md: SPACING.XL },
                zIndex: Z_INDEX.SCROLL_TO_TOP
            }}
        >
            <IconButton
                onClick={scrollToTop}
                size="lg"
                aria-label="Scroll to top"
                sx={{
                    borderRadius: theme.vars.radius.xl,
                    bgcolor: 'primary.500',
                    color: 'white',
                    boxShadow: theme.vars.shadow.lg,
                    width: { xs: 48, md: 56 },
                    height: { xs: 48, md: 56 },
                    transition: `all ${TRANSITION_DURATION.NORMAL} ease`,
                    '&:hover': {
                        color: 'white',
                        bgcolor: 'primary.600',
                        boxShadow: theme.vars.shadow.xl,
                        transform: 'translateY(-2px)'
                    }
                }}
            >
                <ArrowUp size={24} />
            </IconButton>
        </Box>
    );
}

