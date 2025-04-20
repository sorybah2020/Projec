import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavigationContext } from "../context/NavigationContext";
import Logo from "./Logo";
import ProfileImg from "../assets/profile.svg";
import CloseIcon from "../assets/close.svg";
import SidebarNavigation from "./SidebarNavigation";

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
            <p className="budget">
              <img
                className="icon"
                src="https://ej2.syncfusion.com/showcase/typescript/expensetracker/styles/images/cash-wallet.svg"
              />
              ${auth?.budget}
            </p>
          </div>
        </div>
        <SidebarNavigation />
      </aside>
    </>
  );
};

export default Sidebar;
