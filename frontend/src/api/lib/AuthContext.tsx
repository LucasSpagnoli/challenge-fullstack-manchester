import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { loginUser, logoutUser, registerUser, fetchAuthStatus } from '../auth';
import type { AuthContextValue, AuthUser, LoginPayload, RegisterPayload } from '../types/auth.interfaces';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const status = await fetchAuthStatus();
            if (status) {
                setUser(status);
                setIsAuthenticated(true);
            }
            setLoading(false);
        })();
    }, []);

    const login = useCallback(async (payload: LoginPayload) => {
        setError(null);
        setLoading(true);
        try {
            const authUser = await loginUser(payload);
            setUser(authUser);
            setIsAuthenticated(true);
            return authUser;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao fazer login');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (payload: RegisterPayload) => {
        setError(null);
        setLoading(true);
        try {
            const authUser = await registerUser(payload);
            setUser(authUser);
            setIsAuthenticated(true);
            return authUser;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao cadastrar');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        await logoutUser();
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth deve ser invocado no escopo de um <AuthProvider>');
    return context;
}