import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img
          src="https://ej2.syncfusion.com/showcase/typescript/expensetracker/styles/images/title.svg"
          alt="Logo"
        />
      </div>
      <div className="profile">
        <img
          src="https://ej2.syncfusion.com/showcase/typescript/expensetracker/styles/images/user.svg"
          alt="Profile Picture"
          className="profile-picture"
        />
        <h3>Nicholas Delacruz</h3>
        <div>
          <p className="budget">
            <img
              className="icon"
              src="https://ej2.syncfusion.com/showcase/typescript/expensetracker/styles/images/cash-wallet.svg"
            />
            $5,247
          </p>
        </div>
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;