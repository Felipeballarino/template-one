import { Navigate } from 'react-router-dom';
import { useAuthStore } from "../../../store/authStore.js"

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuthStore();
    if (!loading && !user) {
        return <Navigate to="/" replace />;
    }

    if (!loading && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
