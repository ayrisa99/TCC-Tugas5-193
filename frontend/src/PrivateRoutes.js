import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const PrivateRoute = ({ children }) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
