import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import Search from "./Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TransactionsTable from "./TransactionsTable";

const TransactionsContent = () => {
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
export default TransactionsContent;
