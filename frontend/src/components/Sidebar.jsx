import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserAPI from "../services/UserAPI";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Sidebar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  const handleLogOut = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      const result = await UserAPI.logoutUser(options);

      // Check if user logged out successfully
      if (result.message) {
        setAuth(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("User verification failed:", error);
    }
  };

  return (
    <aside className="sidebar">
      <Logo />
      <div className="profile">
        <img
          src="https://ej2.syncfusion.com/showcase/typescript/expensetracker/styles/images/user.svg"
          alt="Profile Picture"
          className="profile-picture"
        />
        <h3>{profile?.name}</h3>
        <div>
          <p className="budget">
            <img
              className="icon"
              src="https://ej2.syncfusion.com/showcase/typescript/expensetracker/styles/images/cash-wallet.svg"
            />
            ${auth?.budget}
          </p>
        </div>
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-menu">
          <li className={location.pathname === "/transactions" ? "active" : ""}>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">Profile</Link>
          </li>
          <li
            className={location.pathname === "/logout" ? "active" : ""}
            onClick={() => handleLogOut()}
          >
            Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;