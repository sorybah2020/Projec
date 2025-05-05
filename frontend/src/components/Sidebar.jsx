import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavigationContext } from "../context/NavigationContext";
import Logo from "./Logo";
import ProfileImg from "../assets/profile.svg";
import CloseIcon from "../assets/close.svg";
import SidebarNavigation from "./SidebarNavigation";
import WalletIcon from "../assets/wallet.svg";

const Sidebar = () => {
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const { sidebarOpened, handleOpenProfile } = useContext(NavigationContext);

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  return (
    <>
      <div
        className={`overlay ${
          sidebarOpened.profile ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        ...
      </div>
      <aside
        className={`sidebar ${
          sidebarOpened.profile ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <span className="close-sibebar-icon" onClick={handleOpenProfile}>
          <img src={CloseIcon} />
        </span>
        <Logo />
        <div className="profile">
          <div className="profile-header">
            <img
              src={ProfileImg}
              alt="Profile Picture"
              className="profile-picture"
            />
          </div>
          <h3>{profile?.name}</h3>
          <div>
            <p
              className="budget"
              style={{
                border: `1px solid ${auth?.budget < 0 ? "#ff5e65" : "#d1d1d1"}`,
                background: `${auth?.budget < 0 ? "#f9ecec" : "#f9f9f9"}`,
              }}
            >
              <img className="icon" src={WalletIcon} />
              {auth?.budget < 0
                ? `-$${Math.abs(auth.budget).toFixed(2)}`
                : `$${auth?.budget.toFixed(2)}`}
            </p>
          </div>
        </div>
        <SidebarNavigation />
      </aside>
    </>
  );
};

export default Sidebar;
