import Spinner from "../components/Spinner";
import CreateModal from "./CreateModal";
import EditModal from "../pages/EditModal";
import PropTypes from "prop-types";
import searchIcon from "../assets/search.svg";
import Pagination from "./Pagination";
import ActionsLinks from "./ActionsLinks";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TransactionsTable = ({
  filteredTransactions,
  setFilteredTransactions,
  setTransactions,
  fetchTransactions,
  transLoading,
  setTransLoading,
}) => {
  let navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [transactionToEdit, setTransactionToEdit] = useState([]);
  const [checkedIds, setChecked] = useState([]);
  //Pagination
  const [currentRows, setCurrentRows] = useState([]);

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

  const handleCheckAll = (target) => {
    //check all checkboxes or uncheck all
    if (target.checked) {
      const checkboxes = [...checkedIds];
      filteredTransactions.map((transaction) => {
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
      const searchResult = filteredTransactions.filter((transaction) =>
        ["category", "paymentMode", "description"].some((key) =>
          transaction[key].toLowerCase().includes(keyword.toLowerCase())
        )
      );
      setTimeout(() => {
        setFilteredTransactions(searchResult);
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
          <label className="search-icon">
            <img src={searchIcon} />
            <input
              type="text"
              placeholder="Search"
              className="search-keyword"
              onInput={(e) => handleSearch(e.target.value)}
            />
          </label>
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
                <ActionsLinks
                  checkedIds={checkedIds}
                  setFilteredTransactions={setFilteredTransactions}
                  setTransactionToEdit={setTransactionToEdit}
                  openModal={openModal}
                />
              </td>
            </tr>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    checkedIds.length === filteredTransactions?.length &&
                    filteredTransactions?.length > 0
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
                <Pagination
                  filteredTransactions={filteredTransactions}
                  setCurrentRows={setCurrentRows}
                  rowsPerPage={10}
                />
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
  filteredTransactions: PropTypes.array.isRequired,
  setFilteredTransactions: PropTypes.func.isRequired,
  setTransactions: PropTypes.func.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  transLoading: PropTypes.bool.isRequired,
  setTransLoading: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
export default TransactionsTable;
