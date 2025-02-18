import { useReducer } from "react";
import DatePicker from "./DatePicker";

const Filters = () => {
  // const [filters, setFilters] = useReducer({
  //   date: {},
  //   category: "",
  //   cashflow: "",
  //   paymentMode: "",
  //   amount: "",
  // });
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
        <DatePicker />
      </div>

      <div className="filter-group">
        <label className="filter-title">Category</label>
        <select className="category-select">
          <option selected disabled>
            Select Categories
          </option>
          <option>Food</option>
          <option>Transportion</option>
          <option>Clothing</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-title">Cashflow</label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" checked /> Income
          </label>
          <label>
            <input type="checkbox" checked /> Expense
          </label>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-title">Payment Mode</label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" checked /> Cash
          </label>
          <label>
            <input type="checkbox" checked /> Debit Card
          </label>
          <label>
            <input type="checkbox" checked /> Credit Card
          </label>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-title">Amount</label>
        <div className="amount-range">
          <label>
            Min: <input type="text" value="$2" />
          </label>
          <span className="separator">—</span>
          <label>
            Max: <input type="text" value="$6,000" />
          </label>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
