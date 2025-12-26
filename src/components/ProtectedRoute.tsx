import { Navigate } from "react-router-dom";
import { useAuth, type UserRole } from "../context/AuthContext";
import type {  ReactNode } from "react";

interface ProtectedRouteProps {
    allowedRoles: UserRole[];
    children : ReactNode;
}
const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
    const { loading , user } = useAuth();
    
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <p>בודק הרשאות...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
