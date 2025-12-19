import { useState, useEffect, type ReactNode, type JSX } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { userService } from '../services/user/user.service';
import type { UserDto } from '../services/user/user.dto';

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserDto | null>(null);

    const refreshAuth = async () => {
        if (localStorage.getItem('token')) {
            try {
                const response = await userService.profile();
                setUser(response.data);
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
                setUser(null);
            }
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
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

