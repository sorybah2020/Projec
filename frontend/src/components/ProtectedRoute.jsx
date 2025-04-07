import PropTypes from "prop-types";
import Spinner from "./Spinner";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //funstion to protect a route, redirect to login if not authenticated
  const { auth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner />
      </div>
    ); // Temporary loading state
  }

  // If no user, redirect to login
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the children
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
