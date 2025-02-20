import Modal from "react-modal";
import PropTypes from "prop-types";

const CreateModal = ({ modalIsOpen, setIsOpen }) => {
  function closeModal(modalName) {
    setIsOpen({ ...modalIsOpen, [modalName]: false });
  }

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
          <label className="header">Cashflow</label>
          <div className="form-group-container">
            <label>
              <input type="checkbox" /> Income
            </label>
            <label>
              <input type="checkbox" /> Expense
            </label>
          </div>
        </div>

        <div className="form-group two-col">
          <div className="form-group-col">
            <label className="header">Choose a Date</label>
            <input type="date" />
          </div>
          <div className="form-group-col">
            <label className="header">Choose a Time</label>
            <input type="time" id="time" name="time" />
          </div>
        </div>

        <div className="form-group two-col">
          <div className="form-group-col">
            <label className="header">Category</label>
            <select>
              <option value="" disabled selected>
                Select Category
              </option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Clothing</option>
            </select>
          </div>
          <div className="form-group-col">
            <label className="header">EnterAmount</label>
            <input type="text" />
          </div>
        </div>

        <div className="form-group">
          <label className="header">Description</label>
          <div className="form-group-container">
            <input type="text" className="desc" />
          </div>
        </div>

        <div className="form-group">
          <label className="header">Payment Mode</label>
          <div className="form-group-container">
            <label>
              <input type="checkbox" /> Cash
            </label>
            <label>
              <input type="checkbox" /> Debit Card
            </label>
            <label>
              <input type="checkbox" /> Credit Card
            </label>
          </div>
        </div>

        <div className="btn-container">
          <input type="submit" className="btn create-btn" value="Create" />
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
};
export default CreateModal;
