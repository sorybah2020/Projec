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
          <li className="active">Transactions</li>
          <li>Dashboard</li>
          <li>About</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
