import Modal from "react-modal";
import PropTypes from "prop-types";
import Validation from "../utilities/Validation";
import TransactionsAPI from "../services/TransactionsAPI";
import { useState, useEffect, useCallback, useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../context/AuthContext";
import { TransactionsContext } from "../context/TransactionsContext";

const EditModal = ({ modalIsOpen, setIsOpen, transactionToEdit }) => {
  const { setAuth } = useContext(AuthContext);
  const { setTransactions, setTransLoading } = useContext(TransactionsContext);

  const [formData, setFormData] = useState([]);
  const [errors, setErrors] = useState({
    category: "",
    date: "",
    paymentMode: "",
    description: "",
    amount: "",
    cashflow: "",
    time: "",
  });

  const categories = [
    "Rent",
    "Food",
    "Bills",
    "Utilities",
    "Transportation",
    "Insurance",
    "Shopping",
    "Entertainment",
    "Health Care",
    "Housing",
    "Taxes",
    "Clothing",
    "Education",
    "Miscellaneous",
    "Personal Care",
  ];
  const reqFields = ["category", "date", "amount", "cashflow"];

  function closeModal(modalName) {
    setErrors({});
    setIsOpen({ ...modalIsOpen, [modalName]: false });
  }

  const handleChange = (input) => {
    const { name, value } = input;
    setFormData({
      ...formData,
      [name]: value,
    });

    const { newErrors } = Validation.validateField(name, value, reqFields);

    setErrors({ ...errors, ...newErrors });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { valid, newErrors } = Validation.validateAll(formData, reqFields);
    setErrors(() => ({
      ...newErrors,
      frm_subms: "",
    }));
    if (valid) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      try {
        const result = await TransactionsAPI.editTransaction(options);
        if (result?.updatedTransaction) {
          setTransLoading(true);
          setTransactions((prevTransactions) => {
            //update transactions
            const trans = [...prevTransactions];
            trans.map((transaction, index) => {
              if (transaction._id === result.updatedTransaction._id) {
                trans[index] = result.updatedTransaction;
              }
            });
            return trans;
          });
          setAuth((prevAuth) => ({
            //update auth budget
            ...prevAuth,
            budget: result.newBudget,
          }));
          closeModal("edition");
        }
        if (result.error) {
          throw new Error(result.error);
        }
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          frm_subms: error.message,
        }));
      }
    }
  };

  const fetchTransaction = useCallback(async () => {
    //get transaction by id
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await TransactionsAPI.getTransaction(
      transactionToEdit,
      options
    );

    if (result.length > 0) {
      setFormData(result[0]);
    }
  }, [transactionToEdit]);

  useEffect(() => {
    if (modalIsOpen.edition) {
      //when the modal is open, get the transaction
      fetchTransaction();
    }
  }, [modalIsOpen.edition, fetchTransaction]);

  return (
    <Modal
      isOpen={modalIsOpen.edition}
      onRequestClose={() => closeModal("edition")}
      contentLabel="Edit Transaction"
      lassName="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
      closeTimeoutMS={300}
    >
      <div className="modal-container">
        <h3 className="header-main modal-header">{"Edit Transaction"}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="modal-close"
          fill="#000000de"
          onClick={() => closeModal("edition")}
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>
      <form>
        <div className="form-group">
          <label className="header">
            Cashflow <em className="text-redText">*</em>
          </label>
          <div className="form-group-container diff">
            <div className="check-wrapper">
              <label>
                <input
                  type="radio"
                  name="cashflow"
                  onChange={(e) => handleChange(e.target)}
                  value={"Income"}
                  disabled={formData?.cashflow === "Expense"}
                  checked={formData?.cashflow === "Income"}
                />{" "}
                Income
              </label>
              <label>
                <input
                  type="radio"
                  name="cashflow"
                  onChange={(e) => handleChange(e.target)}
                  value={"Expense"}
                  disabled={formData?.cashflow === "Expense"}
                  checked={formData?.cashflow === "Expense"}
                />{" "}
                Expense
              </label>
            </div>
            {errors?.["cashflow"] && (
              <em className="err-message">{errors["cashflow"]}</em>
            )}
          </div>
        </div>

        <div className="form-group two-col">
          <div className="form-group-col">
            <label className="header">
              Choose a Date <em className="text-redText">*</em>
            </label>
            <input
              type="date"
              name="date"
              onChange={(e) => handleChange(e.target)}
              value={
                formData?.date
                  ? format(new Date(formData?.date), "yyyy-MM-dd")
                  : ""
              }
            />
            {errors?.["date"] && (
              <em className="err-message">{errors["date"]}</em>
            )}
          </div>
          <div className="form-group-col">
            <label className="header">
              Choose a Time <em className="text-redText">*</em>
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData?.time}
              onChange={(e) => handleChange(e.target)}
            />
            {errors?.["time"] && (
              <em className="err-message">{errors["time"]}</em>
            )}
          </div>
        </div>

        <div className="form-group two-col">
          <div className="form-group-col">
            <label className="header">
              Category <em className="text-redText">*</em>
            </label>
            <select name="category" onChange={(e) => handleChange(e.target)}>
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => {
                if (formData?.category === category) {
                  return (
                    <option key={category} selected>
                      {category}
                    </option>
                  );
                }
                return <option key={category}>{category}</option>;
              })}
            </select>
            {errors?.["category"] && (
              <em className="err-message">{errors["category"]}</em>
            )}
          </div>
          <div className="form-group-col">
            <label className="header">
              EnterAmount <em className="text-redText">*</em>
            </label>
            <input
              type="number"
              name="amount"
              min="1"
              onChange={(e) => handleChange(e.target)}
              value={formData?.amount}
            />
            {errors?.["amount"] && (
              <em className="err-message">{errors["amount"]}</em>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="header">Description</label>
          <div className="form-group-container diff">
            <input
              type="text"
              className="desc"
              name="description"
              value={formData?.description || ""}
              onChange={(e) => handleChange(e.target)}
            />
            {errors?.["description"] && (
              <em className="err-message">{errors["description"]}</em>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="header">Payment Mode</label>
          <div className="form-group-container diff">
            <div className="check-wrapper">
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  onChange={(e) => handleChange(e.target)}
                  value={"Cash"}
                  checked={formData?.paymentMode === "Cash"}
                />{" "}
                Cash
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  onChange={(e) => handleChange(e.target)}
                  value={"Debit Card"}
                  checked={formData?.paymentMode === "Debit Card"}
                />{" "}
                Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  onChange={(e) => handleChange(e.target)}
                  value={"Credit Card"}
                  checked={formData?.paymentMode === "Credit Card"}
                />{" "}
                Credit Card
              </label>
            </div>

            {errors?.["paymentMode"] && (
              <em className="err-message">{errors["paymentMode"]}</em>
            )}
          </div>
        </div>
        <div className="form-group">
          {errors?.["frm_subms"] && (
            <em className="err-message">{errors["frm_subms"]}</em>
          )}
        </div>

        <div className="btn-container">
          <input
            type="submit"
            className="btn create-btn"
            value="Edit"
            onClick={(e) => {
              handleEdit(e);
            }}
          />
          <input
            type="button"
            className="btn second-btn close-btn"
            value="Close"
            onClick={() => closeModal("edition")}
          />
        </div>
      </form>
    </Modal>
  );
};
EditModal.propTypes = {
  modalIsOpen: PropTypes.object.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setTransactions: PropTypes.func.isRequired,
  transactionToEdit: PropTypes.array.isRequired,
};
export default EditModal;
