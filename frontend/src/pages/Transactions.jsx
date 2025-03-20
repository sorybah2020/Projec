import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import TransactionsTable from "./TransactionsTable";
import TransactionsAPI from "../services/TransactionsAPI";
import { useState, useEffect, useCallback } from "react";

const Transactions = () => {
  let authId = "67c0ffcf02a6253bfbd4cdbb";
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [transLoading, setTransLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await TransactionsAPI.getTransactionsById(authId, options);
    if (result.length > 0) {
      setTimeout(() => {
        setTransactions(result);
        setTransLoading(false);
      }, 500);
    } else {
      setTransLoading(false);
    }
  }, [authId]);

  useEffect(() => {
    fetchTransactions();
  }, [authId, fetchTransactions]);

  return (
    <div className="container">
      <Sidebar />
      <main>
        <TransactionsTable
          authId={authId}
          transactions={transactions}
          setTransactions={setTransactions}
          fetchTransactions={fetchTransactions}
          transLoading={transLoading}
          setTransLoading={setTransLoading}
        />
      </main>
      <Filters />
    </div>
  );
};

export default Transactions;
