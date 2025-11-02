import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useAuth";
import { Spinner } from "./ui/shadcn-io/spinner";

export default function PublicedRoute() {
  const { data, isFetched } = useUser();

  if (data?.user) {
    return <Navigate to="/dashboard" />;
  }

  if (!isFetched) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size={50} />;
      </div>
    );
  }

  return <Outlet />;
}
