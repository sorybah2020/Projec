import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import TransactionsTable from "./TransactionsTable";
import PropTypes from "prop-types";
import TransactionsProvider from "../context/TransactionsProvider";

const Transactions = () => {
  return (
    <div className="container">
      <Sidebar />
      <TransactionsProvider>
        <main>
          <TransactionsTable />
        </main>
        <Filters />
      </TransactionsProvider>
    </div>
  );
};
Transactions.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Transactions;
