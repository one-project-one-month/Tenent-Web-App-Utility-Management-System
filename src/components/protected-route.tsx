import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import ErrorBoundary from "./error-boundary";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {

      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {

    return (
      <Alert variant="destructive" className="absolute w-fit top-1/2 left-1/2 -translate-1/2">
        <AlertTitle className="text-center py-2 text-h6">Access Denied</AlertTitle>
        <AlertDescription>
          You need to log in to view this page. Redirecting...
        </AlertDescription>
      </Alert>
    )
  }

  return <ErrorBoundary><Outlet /></ErrorBoundary>
}

export default ProtectedRoute;