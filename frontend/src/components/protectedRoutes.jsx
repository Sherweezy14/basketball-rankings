import { authUser } from "../context/tokencontext";
import { hasPermission } from "../util/userpermissions";
import Home from "../pages/home";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, permission }) {
  const { userLoggedIn } = authUser();

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (hasPermission(userLoggedIn?.role, permission)) {
    return children;
  }
  return <Home />;
}
