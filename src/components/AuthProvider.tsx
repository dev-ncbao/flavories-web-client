import { useState, useEffect, type ReactNode, type JSX } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { userService } from '../services/user/user.service';
import type { UserDto } from '../services/user/user.dto';
import { TOKEN_KEY } from '../constants/ui.constants';

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserDto | null>(null);

    const refreshAuth = async (): Promise<void> => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            setIsLoggedIn(false);
            setUser(null);
            return;
        }

        try {
            const response = await userService.profile();
            setUser(response.data);
            setIsLoggedIn(true);
        } catch {
            setIsLoggedIn(false);
            setUser(null);
            localStorage.removeItem(TOKEN_KEY);
        }
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    const logout = (): void => {
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                setUser,
                setIsLoggedIn,
                logout,
                refreshAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

