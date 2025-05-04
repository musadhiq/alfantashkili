import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./navBar";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
      
  if (!token) return <Navigate to="/auth/login" replace />;
    return (
      <>
        <NavBar />
        {children}
      </>
    );
};
export default ProtectedRoute;
