import React, {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";

import {
    loginUser,
    logoutLocal,
    registerUser,
} from "../auth"
import type { AuthContextValue, AuthUser, LoginPayload, RegisterPayload } from "../types/auth.interfaces";
import { getAuthToken } from "../cookies";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!getAuthToken());

    const login = useCallback(async (payload: LoginPayload) => {
        setError(null);
        setLoading(true);
        try {
            const response = await loginUser(payload);
            setUser({ userId: response.userId, name: response.name });
            setIsAuthenticated(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao fazer login");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (payload: RegisterPayload) => {
        setError(null);
        setLoading(true);
        try {
            const response = await registerUser(payload);
            setUser({ userId: response.userId, name: response.name });
            setIsAuthenticated(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao cadastrar");
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
        <AuthContext.Provider
            value={{ user, isAuthenticated, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um <AuthProvider>");
    }
    return context;
}