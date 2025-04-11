import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import TransactionsTable from "./TransactionsTable";
import TransactionsAPI from "../services/TransactionsAPI";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { parseISO, format } from "date-fns";

const Transactions = () => {
  const { auth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [transLoading, setTransLoading] = useState(true);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({});

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
    console.log("auth", auth);
    if (auth?._id) {
      fetchTransactions();
    }
  }, [auth, fetchTransactions]);

  useEffect(() => {
    if (transactions.length === 0) return;

    let result = [...transactions];

    // Apply Filters
    result = result.filter((transaction) => {
      if (filters.category && transaction.category !== filters.category)
        return false;
      if (
        filters.cashflow.length > 0 &&
        !filters.cashflow.includes(transaction.cashflow.toLowerCase())
      )
        return false;
      if (
        filters.paymentMode.length > 0 &&
        !filters.paymentMode.includes(transaction.paymentMode.toLowerCase())
      )
        return false;
      if (
        transaction.amount < filters.amount?.min ||
        transaction.amount > filters.amount?.max
      )
        return false;
      if (filters.date.startDate && filters.date.endDate) {
        const txDate = format(parseISO(transaction.date), "yyyy-MM-dd");
        const start = format(parseISO(filters.date.startDate), "yyyy-MM-dd");
        const end = format(parseISO(filters.date.endDate), "yyyy-MM-dd");

        if (txDate < start || txDate > end) return false;
      }
      return true;
    });

    // Apply Search
    if (keyword.trim() !== "") {
      result = result.filter((transaction) => {
        const value = keyword.toLowerCase();
        return (
          transaction.category.toLowerCase().includes(value) ||
          transaction.paymentMode.toLowerCase().includes(value) ||
          transaction.description.toLowerCase().includes(value)
        );
      });
    }

    setFilteredTransactions(result);
  }, [filters, keyword, transactions]);

  return (
    <div className="container">
      <Sidebar />
      <main>
        <TransactionsTable
          transactions={transactions}
          filteredTransactions={filteredTransactions}
          setFilteredTransactions={setFilteredTransactions}
          setTransactions={setTransactions}
          fetchTransactions={fetchTransactions}
          transLoading={transLoading}
          setTransLoading={setTransLoading}
          setKeyword={setKeyword}
          keyword={keyword}
        />
      </main>
      <Filters
        transactions={transactions}
        setFilteredTransactions={setFilteredTransactions}
        setKeyword={setKeyword}
        keyword={keyword}
        setFilters={setFilters}
      />
    </div>
  );
};
Transactions.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Transactions;
