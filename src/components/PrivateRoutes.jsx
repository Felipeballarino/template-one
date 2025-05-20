import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    if (!loading && !user) {
        return <Navigate to="/" replace />;
    }

    if (!loading && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
