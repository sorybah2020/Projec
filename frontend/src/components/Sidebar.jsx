import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../services/UserAPI";
import Logo from "./Logo";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  let navigate = useNavigate();
  const { auth } = useContext(AuthContext);
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
            ${auth?.budget}
          </p>
        </div>
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-menu">
          <li className="active">Transactions</li>
          <li>Dashboard</li>
          <li>Profile</li>
          <li onClick={() => handleLogOut()}>Logout</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
