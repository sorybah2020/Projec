import UserAPI from "../services/UserAPI";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      //cehck if user is logged in
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", //sending cookies
        };

        const result = await UserAPI.getUser(options);

        // Check if user data is successfully retrieved
        if (result && result._id) {
          setAuth(result);
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error("User verification failed:", error);
        setAuth(null);
        throw new Error(error);
      } finally {
        //auth data set up, stop loading
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
