import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import UserAPI from "../services/UserAPI";
import Logo from "./Logo";
import Plaid from "./Plaid";

const Sidebar = ({ auth }) => {
  let navigate = useNavigate();

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
            $0
          </p>
        </div>
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-menu">
          <button className="btn btn-primary">Plaid</button>
          <li className="active">Transactions</li>
          <li>Dashboard</li>
          <li>Profile</li>
          <li onClick={() => handleLogOut()}>Logout</li>
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Sidebar;
