import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import TransactionsTable from "./TransactionsTable";
const Transactions = () => {
  return (
    <div className="container">
      <Sidebar />
      <main>
        <TransactionsTable />
      </main>
      <Filters />
    </div>
  );
};

export default Transactions;
