import CreateModal from "../components/CreateModal";
import EditModal from "../components/EditModal";
import Search from "../components/Search";
import TransactionsTable from "./TransactionsTable";
import PropTypes from "prop-types";
import PlusIcon from "../assets/plus.svg";
import Header from "../components/Header";
import { useState } from "react";
import PlaidLink from "../components/Plaid";

const TransactionsContent = () => {
  const [transactionToEdit, setTransactionToEdit] = useState([]);
  //Pagination
  const [currentRows, setCurrentRows] = useState([]);

  // Modal State
  const [modalIsOpen, setIsOpen] = useState({
    creation: false,
    edition: false,
  });

  function openModal(modalName) {
    setIsOpen({ ...modalIsOpen, [modalName]: true });
  }

  return (
    <>
      <Header />
      <div className="page-content">
        <div>
          <p className="header">All Transactions </p>
        </div>
        <div className="search">
          <Search />
          <div
            className="add-transaction-container btn"
            onClick={() => openModal("creation")}
          >
            <img src={PlusIcon} />
            <input
              type="submit"
              className="add-transaction"
              value="add transaction"
            />
          </div>
        </div>
        <TransactionsTable
          setTransactionToEdit={setTransactionToEdit}
          currentRows={currentRows}
          setCurrentRows={setCurrentRows}
          openModal={openModal}
        />

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

TransactionsContent.propTypes = {
  sidebarOpened: PropTypes.bool.isRequired,
  handleOpenFilters: PropTypes.func.isRequired,
  handleOpenProfile: PropTypes.func.isRequired,
};
export default TransactionsContent;
