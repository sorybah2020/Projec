import { useState } from "react";
import { Link } from "react-router-dom";

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
  const rowsPerPage = 3;

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
            value="add transaction"
          />
        </div>
        <table>
          <thead>
            <tr>
              <td colSpan="6" className="header-table">
                <Link to="" className="table-action-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="#5f6368"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                  Edit
                </Link>
                <Link to="" className="table-action-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="#5f6368"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                  Delete
                </Link>
              </td>
            </tr>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
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
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.paymentMode}</td>
                  <td>{transaction.description}</td>
                  <td className="table-amount">{transaction.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No transactions found</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                {/* Pagination Controls */}
                <div className="pagination">
                  <div className="pagination-nav">
                    <button
                      onClick={() => changePage(1)}
                      disabled={currentPage === 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#5f6368"
                      >
                        <path d="M288-288v-384h72v384h-72Zm384 0L480-480l192-192 51 51-141 141 141 141-51 51Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => changePage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#5f6368"
                      >
                        <path d="M576-240 336-480l240-240 51 51-189 189 189 189-51 51Z" />
                      </svg>
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
                      className="next-button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#5f6368"
                      >
                        <path d="M522-480 333-669l51-51 240 240-240 240-51-51 189-189Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => changePage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="next-button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#5f6368"
                      >
                        <path d="m336-288-51-51 141-141-141-141 51-51 192 192-192 192Zm312 0v-384h72v384h-72Z" />
                      </svg>
                    </button>
                  </div>

                  <div className="page-info">
                    {currentPage} of {totalPages} pages ({transactions.length}{" "}
                    items)
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default TransactionsTable;
