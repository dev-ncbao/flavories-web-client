/**
 * Formats a date to a readable string
 * @param date - Date to format
 * @param fallback - Fallback text if date is invalid (default: 'Unknown')
 * @returns Formatted date string
 */
export const formatDate = (
    date?: Date | string | null,
    fallback = 'Unknown'
): string => {
    if (!date) return fallback;
    
    try {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        if (isNaN(dateObj.getTime())) return fallback;
        
        return dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return fallback;
    }
};
