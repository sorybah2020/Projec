import Modal from "react-modal";
import PropTypes from "prop-types";
import { useState } from "react";
import Validation from "../utilities/Validation";
import TransactionsAPI from "../services/TransactionsAPI";

const CreateModal = ({ modalIsOpen, setIsOpen, setTransactions }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    category: "",
    date: "",
    paymentMode: "",
    description: "",
    amount: "",
    cashflow: "",
    time: "",
  });

  function closeModal(modalName) {
    setFormData({});
    setErrors({});
    setIsOpen({ ...modalIsOpen, [modalName]: false });
  }

  const handleChange = (input) => {
    const { name, value } = input;
    setFormData({
      ...formData,
      [name]: value,
    });

    const { newErrors } = Validation.validateField(name, value);

    setErrors({ ...errors, ...newErrors });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { valid, newErrors } = Validation.validateAll(formData);
    setErrors(newErrors);
    if (valid) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const result = await TransactionsAPI.createTransaction(options);
      if (result.success) {
        setTransactions((prevState) => [...prevState, formData]);
        closeModal("creation");
      }
    }
  };

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={modalIsOpen.creation}
      onRequestClose={() => closeModal("creation")}
      contentLabel="Create Transaction"
    >
      <div className="modal-container">
        <h3 className="header-main modal-header">{"New Transaction"}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="modal-close"
          fill="#000000de"
          onClick={() => closeModal("creation")}
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
                />{" "}
                Income
              </label>
              <label>
                <input
                  type="radio"
                  name="cashflow"
                  onChange={(e) => handleChange(e.target)}
                  value={"Expense"}
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
              <option value="" disabled selected>
                Select Category
              </option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Clothing</option>
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
              value={formData.amount}
            />
            {errors?.["amount"] && (
              <em className="err-message">{errors["amount"]}</em>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="header">
            Description <em className="text-redText">*</em>
          </label>
          <div className="form-group-container diff">
            <input
              type="text"
              className="desc"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e.target)}
            />
            {errors?.["description"] && (
              <em className="err-message">{errors["description"]}</em>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="header">
            Payment Mode <em className="text-redText">*</em>
          </label>
          <div className="form-group-container diff">
            <div className="check-wrapper">
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  onChange={(e) => handleChange(e.target)}
                  value={"Cash"}
                />{" "}
                Cash
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  onChange={(e) => handleChange(e.target)}
                  value={"Debit Card"}
                />{" "}
                Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMode"
                  onChange={(e) => handleChange(e.target)}
                  value={"Debit Card"}
                />{" "}
                Credit Card
              </label>
            </div>

            {errors?.["paymentMode"] && (
              <em className="err-message">{errors["paymentMode"]}</em>
            )}
          </div>
        </div>

        <div className="btn-container">
          <input
            type="submit"
            className="btn create-btn"
            value="Create"
            onClick={(e) => {
              handleCreate(e);
            }}
          />
          <input
            type="submit"
            className="btn second-btn close-btn"
            value="Close"
            onClick={() => closeModal("creation")}
          />
        </div>
      </form>
    </Modal>
  );
};
CreateModal.propTypes = {
  modalIsOpen: PropTypes.object.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setTransactions: PropTypes.func.isRequired,
};
export default CreateModal;
