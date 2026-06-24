import { authUser } from "../context/tokencontext";
import { hasPermission } from "../util/userpermissions";
import { useNavigate } from "react-router-dom";
import Home from "../pages/home";

export default function ProtectedRoute({ children, permission }) {
  const { isLoggedIn } = authUser();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Home />;
  }
  if (hasPermission(isLoggedIn?.role, permission)) {
    return children;
  }
  //navigate("/");
}
