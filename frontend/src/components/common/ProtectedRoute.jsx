import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute({
  allowedRoles = [],
  redirectTo = "/login",
}) {
  const location = useLocation();

  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;