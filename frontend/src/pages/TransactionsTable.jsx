import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Spinner from "../components/Spinner";
import CreateModal from "./CreateModal";
//import TransactionsAPI from "../services/TransactionsAPI";
import EditModal from "../pages/EditModal";
import PropTypes from "prop-types";
import TransactionsAPI from "../services/TransactionsAPI";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TransactionsTable = ({
  transactions,
  setTransactions,
  fetchTransactions,
  transLoading,
  setTransLoading,
}) => {
  let navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const [transactionToEdit, setTransactionToEdit] = useState([]);

  const [actLink, setActLink] = useState({
    edit: false,
    delete: false,
  });

  const [checkedIds, setChecked] = useState([]);

  //Pagination
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(transactions?.length / rowsPerPage);
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
    if (auth.budget === 0 && modalName === "creation") {
      navigate("/profile");
    }
    setIsOpen({ ...modalIsOpen, [modalName]: true });
  }

  const handleCheck = (id) => {
    //check the checkboxes for edit and delete
    if (checkedIds.includes(id)) {
      setChecked(checkedIds.filter((item) => item !== id));
      return;
    }
    setChecked([...checkedIds, id]);
  };

  useEffect(() => {
    //update the edit and delete link
    const updateActLink = {
      edit: checkedIds.length === 1,
      delete: checkedIds.length > 0,
    };

    setActLink(updateActLink);
  }, [checkedIds]);

  const handleDelete = async () => {
    //delete transactions
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: checkedIds }),
    };

    try {
      const result = await TransactionsAPI.deleteTransactions(options);
      if (result.success) {
        setTransactions((prevTransactions) => {
          return prevTransactions.filter((trans) => {
            return !checkedIds.includes(trans._id);
          });
        });
        setAuth((prevAuth) => ({
          //update auth budget
          ...prevAuth,
          budget: result.newBudget,
        }));
      }
      if (result.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = () => {
    //Edit the transaction
    setTransactionToEdit(checkedIds[0]);
    openModal("edition");
  };

  const handleCheckAll = (target) => {
    //check all checkboxes or uncheck all
    if (target.checked) {
      const checkboxes = [...checkedIds];
      transactions.map((transaction) => {
        if (!checkedIds.includes(transaction._id)) {
          checkboxes.push(transaction._id);
        }
      });
      setChecked(checkboxes);
      return;
    }
    setChecked([]);
  };

  const handleSearch = (keyword) => {
    if (keyword.trim() !== "") {
      setTransLoading(true);
      //search by category, paymentmode and description
      const searchResult = transactions.filter((transaction) =>
        ["category", "paymentMode", "description"].some((key) =>
          transaction[key].toLowerCase().includes(keyword.toLowerCase())
        )
      );
      setTimeout(() => {
        setTransactions(searchResult);
        setTransLoading(false);
      }, 300);
      return;
    }
    fetchTransactions(); //get again all available transactions
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
          <input
            type="text"
            placeholder="Search"
            className="search-keyword"
            onInput={(e) => handleSearch(e.target.value)}
          />
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
                  style={{
                    color: actLink.edit ? "#000000de" : "#a9a9a9de",
                    pointerEvents: actLink.edit ? "" : "none",
                  }}
                  onClick={() => handleEdit()}
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
                  onClick={() => handleDelete()}
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
                <input
                  type="checkbox"
                  checked={
                    checkedIds.length === transactions?.length &&
                    transactions?.length > 0
                  }
                  onChange={(e) => handleCheckAll(e.target)}
                />
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
            ) : currentRows?.length > 0 ? (
              currentRows?.map((transaction, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      value={transaction._id}
                      checked={checkedIds.includes(transaction._id)}
                      onClick={() => handleCheck(transaction._id)}
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
                    {currentPage} of {totalPages} pages ({transactions?.length}{" "}
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

        <EditModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          setTransactions={setTransactions}
          transactionToEdit={transactionToEdit}
        />
      </div>
    </>
  );
};
TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  setTransactions: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  transLoading: PropTypes.bool.isRequired,
  setTransLoading: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
export default TransactionsTable;
