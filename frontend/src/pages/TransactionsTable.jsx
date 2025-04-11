import Spinner from "../components/Spinner";
import CreateModal from "./CreateModal";
import EditModal from "../pages/EditModal";
import Search from "./Search";
import Pagination from "./Pagination";
import ActionsLinks from "./ActionsLinks";
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TransactionsContext } from "../context/TransactionsContext";

const TransactionsTable = () => {
  let navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { filteredTransactions, transLoading } =
    useContext(TransactionsContext);

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
      currentRows.map((transaction) => {
        if (!checkedIds.includes(transaction._id)) {
          checkboxes.push(transaction._id);
        }
      });
      setChecked(checkboxes);
      return;
    }
    setChecked([]);
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
          <Search />
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
                    currentRows.length > 0 &&
                    currentRows.every((tx) => checkedIds.includes(tx._id))
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
                  rowsPerPage={20}
                />
              </td>
            </tr>
          </tfoot>
        </table>

        <CreateModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />

        <EditModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          transactionToEdit={transactionToEdit}
        />
      </div>
    </>
  );
};
export default TransactionsTable;
