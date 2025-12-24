/**
 * Scrolls to the top of the page smoothly
 */
export const scrollToTop = (): void => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

/**
 * Scrolls to a specific element smoothly
 */
export const scrollToElement = (
    element: HTMLElement | null,
    options?: ScrollIntoViewOptions
): void => {
    element?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        ...options
    });
};

/**
 * Gets the current scroll position
 */
export const getScrollY = (): number => {
    return window.scrollY || document.documentElement.scrollTop;
};

