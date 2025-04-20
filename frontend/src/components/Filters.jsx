import { useEffect, useReducer, useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import CloseIcon from "../assets/close.svg";
import PropTypes from "prop-types";
import { NavigationContext } from "../context/NavigationContext";
const Filters = () => {
  const { sidebarOpened, handleOpenFilters } = useContext(NavigationContext);
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
  const { transactions, setFilters, setTransLoading } =
    useContext(TransactionsContext);

  const filterReducer = (state, action) => {
    setTransLoading(true);
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
    <>
      <div
        className={`overlay ${
          sidebarOpened.filters ? "filters-open" : "filters-closed"
        }`}
      ></div>

      <aside
        className={`filters ${
          sidebarOpened.filters ? "filters-open" : "filters-closed"
        }`}
      >
        <div className="filter-header">
          <span className="filter-icon close" onClick={handleOpenFilters}>
            <img src={CloseIcon} />
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
            <Checkbox
              label="Income"
              name="cashflow"
              checked={filters.cashflow?.includes("income")}
              action={(e) =>
                dispatch({ type: "SET_CASHFLOW", payload: e.target })
              }
            />
            <Checkbox
              label="Expense"
              name="cashflow"
              actionType="SET_CASHFLOW"
              checked={filters.cashflow?.includes("expense")}
              action={(e) =>
                dispatch({ type: "SET_CASHFLOW", payload: e.target })
              }
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-title">Payment Mode</label>
          <div className="checkbox-group">
            <Checkbox
              label="Cash"
              name="cash"
              action={(e) =>
                dispatch({ type: "SET_PAYMENT_MODE", payload: e.target })
              }
              checked={filters.paymentMode?.includes("cash")}
            />
            <Checkbox
              label="Debit Card"
              name="paymentMode"
              action={(e) =>
                dispatch({ type: "SET_PAYMENT_MODE", payload: e.target })
              }
              checked={filters.paymentMode?.includes("debit card")}
            />
            <Checkbox
              label="Credit Card"
              name="paymentMode"
              action={(e) =>
                dispatch({ type: "SET_PAYMENT_MODE", payload: e.target })
              }
              checked={filters.paymentMode?.includes("credit card")}
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-title">Amount</label>
          <div className="amount-range">
            <label>
              <input
                type="text"
                value={filters.amount.min ? filters.amount.min : 0}
                onChange={(e) =>
                  dispatch({
                    type: "SET_AMOUNT_RANGE",
                    payload: { min: e.target.value ? e.target.value : 0 },
                  })
                }
              />
            </label>
            <span className="separator">—</span>
            <label>
              <input
                type="text"
                value={filters.amount.max > 0 ? filters.amount.max : "10000"}
                onChange={(e) =>
                  dispatch({
                    type: "SET_AMOUNT_RANGE",
                    payload: {
                      max: e.target.value > 0 ? e.target.value : "10000",
                    },
                  })
                }
              />
            </label>
          </div>
        </div>
      </aside>
      {/* <img
        src={FiltersIcon}
        className="filtersIcon"
        style={{ opacity: filterOpened ? 0 : 1 }}
        onClick={handleOpenFilters}
      /> */}
    </>
  );
};

Filters.propTypes = {
  filterOpened: PropTypes.bool.isRequired,
  handleOpenFilters: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.object.isRequired,
};

export default Filters;
