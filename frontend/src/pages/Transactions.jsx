import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import TransactionsTable from "./TransactionsTable";
import TransactionsAPI from "../services/TransactionsAPI";
import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

const Transactions = () => {
  const { auth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [transLoading, setTransLoading] = useState(true);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const fetchTransactions = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await TransactionsAPI.getTransactionsById(auth._id, options);
    if (result.length > 0) {
      setTimeout(() => {
        setTransactions(result);
        setTransLoading(false);
      }, 500);
    } else {
      setTransLoading(false);
    }
  }, [auth]);

  useEffect(() => {
    if (auth?._id) {
      fetchTransactions();
    }
  }, [auth, fetchTransactions]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return (
    <div className="container">
      <Sidebar />
      <main>
        <TransactionsTable
          transactions={filteredTransactions}
          setTransactions={setTransactions}
          fetchTransactions={fetchTransactions}
          transLoading={transLoading}
          setTransLoading={setTransLoading}
        />
      </main>
      <Filters
        transactions={transactions}
        setFilteredTransactions={setFilteredTransactions}
      />
    </div>
  );
};
Transactions.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Transactions;
