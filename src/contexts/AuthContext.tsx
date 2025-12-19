import { createContext } from 'react';
import type { UserDto } from '../services/user/user.dto';

export interface AuthContextType {
    isLoggedIn: boolean;
    user: UserDto | null;
    setUser: (user: UserDto | null) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    logout: () => void;
    refreshAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

