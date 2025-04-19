import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import Search from "./Search";
import TransactionsTable from "./TransactionsTable";
import Toggle from "../assets/toggle.svg";
import FiltersIcon from "../assets/filter.svg";
import PropTypes from "prop-types";
import PlusIcon from "../assets/plus.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TransactionsContent = ({
  sidebarOpened,
  handleOpenFilters,
  handleOpenProfile,
}) => {
  let navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [transactionToEdit, setTransactionToEdit] = useState([]);
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

  return (
    <>
      <header>
        <div className="top-navigation">
          <div className="top-navigation-left">
            <img
              src={Toggle}
              className="toggleIcon"
              style={{ opacity: sidebarOpened.profile ? 0 : 1 }}
              onClick={handleOpenProfile}
            />
            <h1>E-tracker</h1>
          </div>
          <img
            src={FiltersIcon}
            className="filtersIcon"
            style={{ opacity: sidebarOpened.filters ? 0 : 1 }}
            onClick={handleOpenFilters}
          />
        </div>
      </header>
      <div className="transactions-content">
        <div>
          <p className="header">All Transactions</p>
        </div>
        <div className="search">
          <Search />
          <div className="add-transaction-container btn">
            <img src={PlusIcon} />
            <input
              type="submit"
              className="add-transaction"
              value="add transaction"
              onClick={() => openModal("creation")}
            />
          </div>
        </div>
        <TransactionsTable
          setTransactionToEdit={setTransactionToEdit}
          currentRows={currentRows}
          setCurrentRows={setCurrentRows}
          openModal={openModal}
          handleOpenProfile={handleOpenProfile}
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
