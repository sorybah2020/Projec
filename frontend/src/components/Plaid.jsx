import { useCallback, useState, useEffect, useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import "../css/Plaid.css";
import { FaChevronRight } from "react-icons/fa";

const PlaidLink = () => {
  const { setTransactions, setFilteredTransactions } =
    useContext(TransactionsContext);

  const [token, setToken] = useState(null);

  // get a link_token from your API when component mounts
  useEffect(() => {
    const email = localStorage.email;
    const createLinkToken = async () => {
      try {
        const response = await axios.post("/api/plaid/token", { email });
        const link_token = response.data.link_token;
        setToken(link_token);
      } catch (error) {
        console.log(error, "YOU FAILED TO GET A TOKEN");
      }
    };
    createLinkToken();
  }, []);

  const formatedCategory = (category) => {
    if (typeof category !== "string" || category.trim() === "") {
      return category;
    }

    return category
      .trim()
      .toLowerCase()
      .split("_")
      .filter(Boolean)
      .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(" ");
  };

  const onSuccess = useCallback(
    (publicToken) => {
      const exchangeToken = async (publicToken) => {
        const email = localStorage.email;
        try {
          const tokenExchange = await axios.post("/api/plaid/exchange", {
            publicToken,
            email,
          });

          const transactionsResponse = await axios.get(
            "/api/plaid/transactions",
            {
              params: { email: email },
            }
          );

          const transaction = transactionsResponse.data.transactions.map(
            ({ personal_finance_category, date, amount, merchant_name }) => ({
              category: formatedCategory(personal_finance_category.primary),
              date,
              amount: Math.abs(amount),
              paymentMode: "Debit Card",
              description: merchant_name,
              cashflow: "Expense",
              time: "00:00",
            })
          );

          const createTransactions = await axios.post(
            "/api/transaction/multiple",
            {
              transactions: transaction,
              email: email,
            }
          );

          setTransactions(transaction);
          setFilteredTransactions(transaction);
        } catch (error) {
          console.log(error);
        }
      };
      exchangeToken(publicToken);
    },
    [setFilteredTransactions, setTransactions]
  );

  const config = {
    token,
    onSuccess,
    // onEvent,
    // onExit,
  };

  const {
    open,
    ready,
    // error,
    // exit
  } = usePlaidLink(config);

  return (
    <div>
      <button className="plaid-button" onClick={() => open()} disabled={!ready}>
        <span className="button-wrapper">
          <span className="button-text">Plaid</span>
          <span className="button-pic">
            <i className="arrow-icon">
              <FaChevronRight />
            </i>
          </span>
        </span>
      </button>
    </div>
  );
};
export default PlaidLink;
