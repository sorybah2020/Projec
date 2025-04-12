import Spinner from "../components/Spinner";
import Pagination from "./Pagination";
import ActionsLinks from "./ActionsLinks";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { useContext, useState } from "react";
import { TransactionsContext } from "../context/TransactionsContext";

const TransactionsTable = ({
  setTransactionToEdit,
  currentRows,
  setCurrentRows,
  openModal,
}) => {
  const { filteredTransactions, transLoading } =
    useContext(TransactionsContext);

  const [checkedIds, setChecked] = useState([]);

  //check the checkboxes for edit and delete
  const handleCheck = (id) => {
    if (checkedIds.includes(id)) {
      setChecked(checkedIds.filter((item) => item !== id));
      return;
    }
    setChecked([...checkedIds, id]);
  };

  //check all checkboxes or uncheck all
  const handleCheckAll = (target) => {
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
    <table>
      <thead>
        <tr>
          <td colSpan="6" className="header-table">
            <ActionsLinks
              checkedIds={checkedIds}
              setChecked={setChecked}
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
                currentRows.length >= 0 &&
                currentRows.every((tx) => checkedIds.includes(tx._id)) &&
                checkedIds.length !== 0
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
            <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
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
  );
};
TransactionsTable.propTypes = {
  setTransactionToEdit: PropTypes.func.isRequired,
  currentRows: PropTypes.array.isRequired,
  setCurrentRows: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
export default TransactionsTable;
