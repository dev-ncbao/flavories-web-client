import { useContext } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext";

// Custom hook to easily use the snackbar in any component
export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};