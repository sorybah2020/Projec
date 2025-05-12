import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import TransactionsContent from "./TransactionsContent";
import PropTypes from "prop-types";
import TransactionsProvider from "../context/TransactionsProvider";
import NavigationProvider from "../context/NavigationProvider";
import ChatBot from "../components/ChatBot";

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
        <ChatBot />
      </div>
    </div>
  );
};
Transactions.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Transactions;
