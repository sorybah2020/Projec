import PropTypes from "prop-types";
import TransactionsAPI from "../services/TransactionsAPI";
import { AuthContext } from "./AuthContext";
import { TransactionsContext } from "./TransactionsContext";
import { useEffect, useState, useCallback, useContext } from "react";
import { parseISO, format } from "date-fns";

const TransactionsProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [transLoading, setTransLoading] = useState(true);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({});

  const fetchTransactions = useCallback(async () => {
    //fetch transactions from the API
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
      }, 300);
    } else {
      setTransLoading(false);
    }
  }, [auth]);

  //fetch transactions when the the dependencies of it change
  useEffect(() => {
    if (auth?._id) {
      fetchTransactions();
    }
  }, [auth, fetchTransactions]);

  // format the date to yyyy-MM-dd
  const formatDate = (date) => {
    return format(parseISO(date), "yyyy-MM-dd");
  };

  // on change of filters and keyword, filter the transactions
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
        const txDate = formatDate(transaction.date);
        const start = formatDate(filters.date.startDate);
        const end = formatDate(filters.date.endDate);

        if (txDate < start || txDate > end) return false;
      }
      return true;
    });

    // Apply Search when not empty keyword
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
    setTimeout(() => {
      setTransLoading(false);
    }, 1500);
  }, [filters, keyword, transactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        filteredTransactions,
        setFilteredTransactions,
        setTransactions,
        fetchTransactions,
        transLoading,
        setTransLoading,
        setKeyword,
        keyword,
        setFilters,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

TransactionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TransactionsProvider;
