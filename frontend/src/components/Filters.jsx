const Filters = () => {
  return (
    <aside className="filters">
      <div className="filter-header">
        <span className="filter-icon">&#9881;</span>
        <h3>Filters</h3>
      </div>

      <div className="filter-group">
        <label className="filter-title">Select a range</label>
        <input
          type="text"
          className="date-range"
          value="05/31/2017 - 11/30/2017"
        />
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
