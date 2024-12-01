import { Navigate, Outlet } from "react-router";
import { useAuth } from "../providers/AuthProvider";

const AuthLayout = () => {
  const auth = useAuth();

  if (auth.token === "") return <Navigate to={"/login"} />;


  return <Outlet />;
};

export default AuthLayout;
