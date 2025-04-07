import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import TransactionsTable from "./TransactionsTable";
import TransactionsAPI from "../services/TransactionsAPI";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserAPI from "../services/UserAPI";

const Transactions = () => {
  let navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transLoading, setTransLoading] = useState(true);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", //sending cookies
        };

        const result = await UserAPI.getUser(options);
        console.log(result);

        // Check if user data is successfully retrieved
        if (result && result._id) {
          setAuth(result);
        } else {
          // If no user data, redirect to login
          navigate("/login");
        }
      } catch (error) {
        console.error("User verification failed:", error);
        navigate("/login");
      }
    };

    verifyUser();
  }, [navigate]);

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
      <Sidebar auth={auth} />
      <main>
        <TransactionsTable
          authId={auth?._id}
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

export default Transactions;
