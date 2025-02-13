import { useState } from "react";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([
    {
      category: "Food",
      date: "11/30/2017",
      paymentMode: "Debit Card",
      description: "Palmetto Cheese, Mint julep",
      amount: "$6",
    },
    {
      category: "Housing",
      date: "11/29/2017",
      paymentMode: "Credit Card",
      description: "Laundry and cleaning supplies",
      amount: "$20",
    },
    {
      category: "Food",
      date: "11/29/2017",
      paymentMode: "Credit Card",
      description: "Muffuletta sandwich, Mint julep",
      amount: "$10",
    },
    {
      category: "Clothing",
      date: "11/28/2017",
      paymentMode: "Debit Card",
      description: "Pair of Running Shoes",
      amount: "$45",
    },
    {
      category: "Education",
      date: "11/28/2017",
      paymentMode: "Cash",
      description: "Expense for Education",
      amount: "$50",
    },
    {
      category: "Transportation",
      date: "11/27/2017",
      paymentMode: "Debit Card",
      description: "Cars and trucks, used",
      amount: "$7",
    },
    {
      category: "Food",
      date: "11/27/2017",
      paymentMode: "Credit Card",
      description: "Palmetto Cheese, Mint julep",
      amount: "$12",
    },
    {
      category: "Food",
      date: "11/26/2017",
      paymentMode: "Debit Card",
      description: "Peanuts in Coke",
      amount: "$8",
    },
    {
      category: "Shopping",
      date: "11/26/2017",
      paymentMode: "Cash",
      description: "Beauty care things",
      amount: "$65",
    },
    {
      category: "Miscellaneous",
      date: "11/25/2017",
      paymentMode: "Debit Card",
      description: "Cinema, International Release",
      amount: "$7",
    },
  ]);
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = transactions.slice(indexOfFirstRow, indexOfLastRow);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
            {currentRows.length > 0 ? (
              currentRows.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.category}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.paymentMode}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => changePage(1)} disabled={currentPage === 1}>
          |&lt;
        </button>
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNumber = Math.max(1, currentPage - 2) + i;
          if (pageNumber > totalPages) return null;
          return (
            <button
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          onClick={() => changePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;|
        </button>
      </div>

      <div className="page-info">
        Page {currentPage} of {totalPages} ({transactions.length} items)
      </div>
    </>
  );
};

export default TransactionsTable;
