import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../api/lib/useAuth";
import { getPreferences } from "../api/preferences";

export const RequireAuth: React.FC = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export const RedirectIfAuth: React.FC = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/feed" replace />;
    }

    return <Outlet />;
};

export const RequirePreferences: React.FC = () => {
    const { user } = useAuth();
    const [checking, setChecking] = useState(true);
    const [hasPreferences, setHasPreferences] = useState(true);

    useEffect(() => {
        if (!user) {
            setChecking(false);
            return;
        }

        let mounted = true;

        getPreferences(user.userId)
            .then((topics) => {
                if (mounted) setHasPreferences(topics.length > 0);
            })
            .catch(() => {
                if (mounted) setHasPreferences(false);
            })
            .finally(() => {
                if (mounted) setChecking(false);
            });

        return () => {
            mounted = false;
        };
    }, [user]);

    if (checking) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-white">
                <p className="text-sm text-black/40 uppercase tracking-[0.2em]">
                    Carregando...
                </p>
            </div>
        );
    }

    if (!hasPreferences) {
        return <Navigate to="/preferences" replace />;
    }

    return <Outlet />;
};