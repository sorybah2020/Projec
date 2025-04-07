import Modal from "react-modal";
import PropTypes from "prop-types";
import Validation from "../utilities/Validation";
import UserAPI from "../services/UserAPI";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const EditProfileModal = ({ modalIsOpen, setIsOpen }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState(auth);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    budget: "",
  });
  Modal.setAppElement("#root");

  useEffect(() => {
    // Update formData whenever auth changes
    setFormData(auth);
  }, [auth]);

  const reqFields = ["name", "email", "budget"];

  const handleChange = (input) => {
    const { name, value } = input;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const { valid, newErrors } = Validation.validateAll(formData, reqFields);
    setErrors(newErrors);

    if (valid) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      };

      try {
        const result = await UserAPI.editUser(options);
        console.log(result);

        if (result.message) {
          console.log(result.message);
          throw new Error(result.message);
        } else {
          // Successfully updated, update context and close modal
          setAuth(result);
          closeModal();
        }
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          frm_subms: error.message,
        }));
      }
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => closeModal()}
      contentLabel="Edit Profile"
    >
      <div className="modal-container">
        <h3 className="header-main modal-header">Edit Profile</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="modal-close"
          fill="#000000de"
          onClick={() => closeModal()}
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>

      <form>
        <div className="form-group">
          <label className="header">
            Username <em className="text-redText">*</em>
          </label>
          <div className="form-group-container diff">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Username"
              required
              onChange={(e) => handleChange(e.target)}
              value={formData?.name || ""}
            />
            {errors?.["name"] && (
              <em className="err-message">{errors["name"]}</em>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="header">
            Email <em className="text-redText">*</em>
          </label>
          <div className="form-group-container diff">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => handleChange(e.target)}
              value={formData?.email || ""}
            />
            {errors?.["email"] && (
              <em className="err-message">{errors["email"]}</em>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="header">
            Budget <em className="text-redText">*</em>
          </label>
          <div className="form-group-container diff">
            <input
              type="number"
              id="budget"
              name="budget"
              required
              onChange={(e) => handleChange(e.target)}
              value={formData?.budget || ""}
            />
            {errors?.["budget"] && (
              <em className="err-message">{errors["budget"]}</em>
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
            onClick={(e) => handleEditProfile(e)}
          />
          <input
            type="submit"
            className="btn second-btn close-btn"
            value="Close"
            onClick={() => closeModal()}
          />
        </div>
      </form>
    </Modal>
  );
};

EditProfileModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditProfileModal;
