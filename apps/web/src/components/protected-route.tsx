import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../providers/auth-provider';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    // You could show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
