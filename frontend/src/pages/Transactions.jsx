import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import TransactionsContent from "./TransactionsContent";
import PropTypes from "prop-types";
import TransactionsProvider from "../context/TransactionsProvider";
import { useState } from "react";

const Transactions = () => {
  const [sidebarOpened, setSidebarOpened] = useState({
    filters: false,
    profile: false,
  });
  const handleOpenFilters = () => {
    setSidebarOpened({
      ...sidebarOpened,
      filters: !sidebarOpened.filters,
    });
  };

  const handleOpenProfile = () => {
    setSidebarOpened({
      ...sidebarOpened,
      profile: !sidebarOpened.profile,
    });
  };

  return (
    <div className="container">
      <Sidebar
        sidebarOpened={sidebarOpened}
        handleOpenProfile={handleOpenProfile}
      />
      <TransactionsProvider>
        <main>
          <TransactionsContent
            sidebarOpened={sidebarOpened}
            handleOpenFilters={handleOpenFilters}
            handleOpenProfile={handleOpenProfile}
          />
        </main>
        <Filters
          sidebarOpened={sidebarOpened}
          handleOpenFilters={handleOpenFilters}
        />
      </TransactionsProvider>
    </div>
  );
};
Transactions.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Transactions;
