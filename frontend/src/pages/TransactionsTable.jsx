import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Spinner from "../components/Spinner";
import CreateModal from "./CreateModal";
import TransactionsAPI from "../services/TransactionsAPI";
import PropTypes from "prop-types";

const TransactionsTable = ({ authId = "67c0ffcf02a6253bfbd4cdbb" }) => {
  const [transactions, setTransactions] = useState([]);
  const [transLoading, setTransLoading] = useState(true);
  const [actLink, setActLink] = useState({
    edit: false,
    delete: false,
  });
  const [editIds, setEditids] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await TransactionsAPI.getTransactionsById(authId, options);
      if (result.length > 0) {
        setTimeout(() => {
          setTransactions(result);
          setTransLoading(false);
        }, 1000);
      } else {
        setTransLoading(false);
      }
    };
    fetchTransactions();
  }, [authId]);

  //Pagination
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = transactions?.slice(indexOfFirstRow, indexOfLastRow);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Modal State
  const [modalIsOpen, setIsOpen] = useState({
    creation: false,
    edition: false,
  });

  function openModal(modalName) {
    setIsOpen({ ...modalIsOpen, [modalName]: true });
  }

  const handleCheck = (id) => {
    if (editIds.includes(id)) {
      setEditids(editIds.filter((item) => item !== id));
      return;
    }
    setEditids([...editIds, id]);
  };

  useEffect(() => {
    const updateActLink = {
      edit: editIds.length === 1,
      delete: editIds.length > 0,
    };

    setActLink(updateActLink);
  }, [editIds]);

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
            onClick={() => openModal("creation")}
          />
        </div>

        <table>
          <thead>
            <tr>
              <td colSpan="6" className="header-table">
                <Link
                  to=""
                  className="table-action-link"
                  style={{ color: actLink.edit ? "#000000de" : "#a9a9a9de" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    style={{ fill: "currentColor" }}
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                  Edit
                </Link>
                <Link
                  to=""
                  className="table-action-link"
                  style={{ color: actLink.delete ? "#000000de" : "#a9a9a9de" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    style={{ fill: "currentColor" }}
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
            {transLoading ? (
              // Show spinner inside the table body while loading
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <Spinner />
                </td>
              </tr>
            ) : currentRows.length > 0 ? (
              currentRows.map((transaction, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      value={transaction._id}
                      onClick={(e) => handleCheck(e.target.value)}
                    />
                  </td>
                  <td>{transaction.category}</td>
                  <td>{format(new Date(transaction.date), "MM-dd-yyyy")}</td>
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

        <CreateModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          setTransactions={setTransactions}
        />
      </div>
    </>
  );
};
TransactionsTable.propTypes = {
  authId: PropTypes.string.isRequired,
};
export default TransactionsTable;
