import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";

const Filters = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close date picker when clicking outside
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
        <label className="filter-title">Select a range</label>
        <div className="filter-date-section" ref={ref}>
          <div className="filter-date">
            <input
              type="text"
              onClick={() => setOpen(!open)}
              className="date-picker"
              readOnly
              value={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
                range[0].endDate,
                "dd/MM/yyyy"
              )}`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#5f6368"
              className="date-icon"
            >
              <path d="M320-400q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm160 0q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm160 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
            </svg>
          </div>

          {open && (
            <div className="date-picker-container">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={range}
              />
            </div>
          )}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-title">Category</label>
        <select className="category-select">
          <option selected disabled>
            Select Categories
          </option>
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
