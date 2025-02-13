const TransactionsTable = () => {
  return (
    <>
      <header>
        <div className="top-navigation">
          <p className="header">All Transactions</p>
        </div>
      </header>
      <div>
        <div className="search">
          <input type="text" placeholder="Search" className="search-keyword" />
          <input
            type="submit"
            className="btn add-transaction"
            value="ADD TRANSACTION"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Payment Mode</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Food</td>
              <td>11/30/2017</td>
              <td>Debit Card</td>
              <td>Palmetto Cheese, Mint julep</td>
              <td>$6</td>
            </tr>
            <tr>
              <td>Transportation</td>
              <td>11/30/2017</td>
              <td>Debit Card</td>
              <td>Other vehicle expenses</td>
              <td>$7</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionsTable;
