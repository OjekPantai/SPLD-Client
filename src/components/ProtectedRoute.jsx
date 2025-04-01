import useAuthStore from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) {
    navigate("/login");
    return null;
  }

  return children;
};

export default ProtectedRoute;
