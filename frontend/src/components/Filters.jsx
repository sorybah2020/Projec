import { useEffect, useReducer } from "react";
import DatePicker from "./DatePicker";
import PropTypes from "prop-types";

const Filters = ({ transactions, setFilters }) => {
  const categories = [
    "Rent",
    "Food",
    "Bills",
    "Utilities",
    "Transportation",
    "Insurance",
    "Shopping",
    "Entertainment",
    "Health Care",
    "Housing",
    "Taxes",
    "Clothing",
    "Education",
    "Miscellaneous",
    "Personal Care",
  ];
  const filtersInitialState = {
    date: {},
    category: "",
    cashflow: ["expense", "income"],
    paymentMode: ["cash", "debit card", "credit card"],
    amount: { min: 0, max: 10000 },
  };
  const filterReducer = (state, action) => {
    switch (action.type) {
      case "SET_CATEGORY": {
        if (action.payload.toLowerCase() === "all") {
          return { ...state, category: transactions.category };
        }
        return { ...state, category: action.payload };
      }
      case "SET_CASHFLOW":
        if (!action.payload.checked) {
          return {
            ...state,
            cashflow: state.cashflow.filter(
              (el) => el !== action.payload.value.toLowerCase()
            ),
          };
        }
        return {
          ...state,
          cashflow: [...state.cashflow, action.payload.value.toLowerCase()],
        };
      case "SET_PAYMENT_MODE":
        if (!action.payload.checked) {
          return {
            ...state,
            paymentMode: state.paymentMode.filter(
              (el) => el !== action.payload.value.toLowerCase()
            ),
          };
        }
        return {
          ...state,
          paymentMode: [
            ...state.paymentMode,
            action.payload.value.toLowerCase(),
          ],
        };
      case "SET_DATE":
        return { ...state, date: action.payload };
      case "SET_AMOUNT_RANGE":
        if (action.payload) {
          return {
            ...state,
            amount: { ...state.amount, ...action.payload },
          };
        }
    }
  };

  const [filters, dispatch] = useReducer(filterReducer, filtersInitialState);

  useEffect(() => {
    setFilters(filters);
  }, [filters, setFilters]);

  return (
    <aside className="filters">
      <div className="filter-header">
        <span className="filter-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
          </svg>
        </span>
        <h3>Filters</h3>
      </div>

      <div className="filter-group">
        <DatePicker dispatch={dispatch} />
      </div>

      <div className="filter-group">
        <label className="filter-title">Category</label>
        <select
          className="category-select"
          onChange={(e) => {
            dispatch({ type: "SET_CATEGORY", payload: e.target.value });
          }}
        >
          <option selected>All</option>
          {categories.map((category) => {
            return <option key={category}>{category}</option>;
          })}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-title">Cashflow</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="cashflow"
              onChange={(e) =>
                dispatch({ type: "SET_CASHFLOW", payload: e.target })
              }
              value={"Income"}
              checked={filters.cashflow?.includes("income")}
            />{" "}
            Income
          </label>
          <label>
            <input
              type="checkbox"
              name="cashflow"
              onChange={(e) =>
                dispatch({ type: "SET_CASHFLOW", payload: e.target })
              }
              checked={filters.cashflow?.includes("expense")}
              value={"Expense"}
            />{" "}
            Expense
          </label>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-title">Payment Mode</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="paymentMode"
              onChange={(e) =>
                dispatch({ type: "SET_PAYMENT_MODE", payload: e.target })
              }
              value={"Cash"}
              checked={filters.paymentMode.includes("cash")}
            />{" "}
            Cash
          </label>
          <label>
            <input
              type="checkbox"
              name="paymentMode"
              onChange={(e) =>
                dispatch({ type: "SET_PAYMENT_MODE", payload: e.target })
              }
              value={"Debit Card"}
              checked={filters.paymentMode.includes("debit card")}
            />{" "}
            Debit Card
          </label>
          <label>
            <input
              type="checkbox"
              name="paymentMode"
              onChange={(e) =>
                dispatch({ type: "SET_PAYMENT_MODE", payload: e.target })
              }
              value={"Credit Card"}
              checked={filters.paymentMode.includes("credit card")}
            />{" "}
            Credit Card
          </label>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-title">Amount</label>
        <div className="amount-range">
          <label>
            Min:{" "}
            <input
              type="text"
              value={filters.amount.min}
              onChange={(e) =>
                dispatch({
                  type: "SET_AMOUNT_RANGE",
                  payload: { min: e.target.value },
                })
              }
            />
          </label>
          <span className="separator">—</span>
          <label>
            Max:{" "}
            <input
              type="text"
              value={filters.amount.max}
              onChange={(e) =>
                dispatch({
                  type: "SET_AMOUNT_RANGE",
                  payload: { max: e.target.value },
                })
              }
            />
          </label>
        </div>
      </div>
    </aside>
  );
};
Filters.propTypes = {
  transactions: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  setFilteredTransactions: PropTypes.func.isRequired,
};

export default Filters;
