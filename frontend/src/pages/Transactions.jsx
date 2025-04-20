import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import TransactionsContent from "./TransactionsContent";
import PropTypes from "prop-types";
import TransactionsProvider from "../context/TransactionsProvider";
import NavigationProvider from "../context/NavigationProvider";

const Transactions = () => {
  return (
    <div className="page">
      <div className="container">
        <NavigationProvider>
          <Sidebar />
          <TransactionsProvider>
            <main>
              <TransactionsContent />
            </main>

            <Filters />
          </TransactionsProvider>
        </NavigationProvider>
      </div>
    </div>
  );
};
Transactions.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Transactions;
