import Modal from "react-modal";
import PropTypes from "prop-types";
import Validation from "../utilities/Validation";
import TransactionsAPI from "../services/TransactionsAPI";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { TransactionsContext } from "../context/TransactionsContext";

const CreateModal = ({ modalIsOpen, setIsOpen }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setTransactions, setTransLoading } = useContext(TransactionsContext);

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

  //List of categories and required fields
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
  const reqFields = [
    "category",
    "date",
    "paymentMode",
    "description",
    "amount",
    "cashflow",
    "time",
  ];

  //Set the userId in the formData state
  useEffect(() => {
    setFormData({
      userId: auth?._id,
    });
  }, [auth]);

  //Close the modal
  function closeModal(modalName) {
    setFormData({
      userId: auth?._id,
    });
    setErrors({});
    setIsOpen({ ...modalIsOpen, [modalName]: false });
  }

  //Handle form input changes
  const handleChange = (input) => {
    const { name, value } = input;
    setFormData({
      ...formData,
      [name]: value,
    });

    //Put errors for each field in the errors state
    const { newErrors } = Validation.validateField(name, value, reqFields);

    setErrors({ ...errors, ...newErrors });
  };

  //Create a new transaction
  const handleCreate = async (e) => {
    e.preventDefault();

    const { valid, newErrors } = Validation.validateAll(formData, reqFields);
    setErrors(() => ({
      ...newErrors,
      frm_subms: "",
    }));
    if (valid) {
      setTransLoading(true);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      try {
        const result = await TransactionsAPI.createTransaction(options);
        if (result.success) {
          //update transaction state
          setTransactions((prevState) => [...prevState, result.transaction]);
          setAuth((prevAuth) => ({
            //update auth budget
            ...prevAuth,
            budget: result.newBudget,
          }));
          closeModal("creation");
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

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={modalIsOpen.creation}
      onRequestClose={() => closeModal("creation")}
      contentLabel="Create Transaction"
      lassName="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
      closeTimeoutMS={300}
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
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
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

        <div className="form-group">
          {errors?.["frm_subms"] && (
            <em className="err-message">{errors["frm_subms"]}</em>
          )}
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
  auth: PropTypes.string.isRequired,
};
export default CreateModal;
