import { createContext, useContext } from "react";
import type { AuthContextValue } from "../types/auth.interfaces";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) { throw new Error("useAuth deve ser usado dentro de um <AuthProvider>"); }
    return context;
}