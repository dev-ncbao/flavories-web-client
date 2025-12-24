import { useEffect, useState } from 'react';
import { SCROLL_THRESHOLD } from '../constants/ui.constants';
import { getScrollY } from '../utils/scrollUtils';

/**
 * Hook to manage scroll-to-top button visibility
 * @param threshold - Scroll threshold in pixels (default: SCROLL_THRESHOLD)
 * @returns boolean indicating if scroll-to-top button should be visible
 */
export const useScrollToTop = (threshold = SCROLL_THRESHOLD): boolean => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(getScrollY() > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return showButton;
};

