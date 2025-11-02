import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/useAuth";
import { Spinner } from "./ui/shadcn-io/spinner";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
};

function ProtectedRoute({
  children,
  requireAdmin = false,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isFetched: isInitialized, data } = useUser();
  const isAuthenticated = data?.user?.role === "authenticated";
  const location = useLocation();

  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size={50} className="mx-auto" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requireAdmin && isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated (and admin if required), render children
  return <>{children}</>;
}

export default ProtectedRoute;
