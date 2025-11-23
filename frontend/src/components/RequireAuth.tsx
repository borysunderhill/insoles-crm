import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

export function RequireAuth({ children }: { children: ReactNode }) {
    const { session, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Завантаження...</div>;
    }

    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Admin Protection
    // TODO: Move this to a database table in the future
    const ADMIN_EMAILS = ['borys.underhill@gmail.com', 'borys.underhill@gmil.com'];
    const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/marketing');

    if (isAdminRoute && user?.email && !ADMIN_EMAILS.includes(user.email)) {
        return <Navigate to="/client-dashboard" replace />;
    }

    return children;
}
