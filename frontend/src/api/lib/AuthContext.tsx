import React, { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { loginUser, logoutLocal, registerUser } from '../auth';
import type { AuthContextValue, AuthUser, LoginPayload, RegisterPayload } from '../types/auth.interfaces';
import { getAccessToken } from '../accessToken';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function decodeJwtUser(token: string): AuthUser | null {
    try {
        const payloadBase64 = token.split('.')[1];
        if (!payloadBase64) return null;
        const json = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        const payload = JSON.parse(json);
        if (!payload.sub && !payload.userId && !payload.id) return null;
        return {
            userId: payload.sub ?? payload.userId ?? payload.id,
            name: payload.name ?? '',
            role: payload.role === 'admin' ? 'admin' : 'user',
        };
    } catch {
        return null;
    }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(() => {
        const token = getAccessToken();
        return token ? decodeJwtUser(token) : null;
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!getAccessToken());

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

    const logout = useCallback(() => {
        logoutLocal();
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