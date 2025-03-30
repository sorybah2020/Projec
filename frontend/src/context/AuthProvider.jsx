import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import UserAPI from "../services/UserAPI";
import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
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
        }
      } catch (error) {
        console.error("User verification failed:", error);
        throw new Error(error);
      }
    };

    verifyUser();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
