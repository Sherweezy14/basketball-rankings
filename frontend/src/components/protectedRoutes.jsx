import { authUser } from "../context/tokencontext";
import { hasPermission } from "../util/userpermissions";
import Home from "../pages/home";

export default function ProtectedRoute({ children, permission }) {
  const { userLoggedIn } = authUser();
  if (!userLoggedIn) {
    <Navigate to="/login" replace />;
  }
  if (hasPermission(userLoggedIn.role, permission)) {
    return children;
  }
  return <Home />;
}
