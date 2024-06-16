import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useModerator from "../Hooks/useModerator";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isModerator, isModeratorLoading] = useModerator();
  const location = useLocation();
  if (loading || isModeratorLoading) {
    return <div className="loading loading-spinner"></div>;
  }
  if (user && isModerator) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default ModeratorRoute;
