import TransactionsAPI from "../services/TransactionsAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ActionsLinks = ({
  checkedIds,
  setFilteredTransactions,
  setTransactionToEdit,
  openModal,
}) => {
  const { setAuth } = useContext(AuthContext);

  const [actLink, setActLink] = useState({
    edit: false,
    delete: false,
  });

  useEffect(() => {
    //update the edit and delete link
    const updateActLink = {
      edit: checkedIds?.length === 1,
      delete: checkedIds?.length > 0,
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
        setFilteredTransactions((prevTransactions) => {
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

  return (
    <>
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
    </>
  );
};
ActionsLinks.propTypes = {
  checkedIds: PropTypes.array.isRequired,
  setFilteredTransactions: PropTypes.func.isRequired,
  setTransactionToEdit: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
export default ActionsLinks;
