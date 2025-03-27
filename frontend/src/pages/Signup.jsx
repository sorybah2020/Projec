import { Link } from "react-router-dom";
import { useState } from "react";
import SignupAPI from "../services/SignupAPI";
import { useNavigate } from "react-router-dom";
import Validation from "../utilities/Validation";

const Signup = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const reqFields = ["name", "email", "password"];

  const handleChange = (input) => {
    //handle change in input fields
    const { name, value } = input;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    //validate login fields
    const { valid, newErrors } = Validation.validateAll(formData, reqFields);
    setErrors(newErrors);
    if (valid) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const result = await SignupAPI.createUser(options); //submit user info
      if (!result.statusText === "Created") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          frm_subms: result.message,
        }));
        return;
      }
      navigate("/login"); //navigate to login page
    }
  };

  return (
    <>
      <div id="signup-form" className="form-container">
        <h2>Welcome Back</h2>
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
              />
              {errors?.["email"] && (
                <em className="err-message">{errors["email"]}</em>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="header">
              Password <em className="text-redText">*</em>
            </label>
            <div className="form-group-container diff">
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                name="password"
                onChange={(e) => handleChange(e.target)}
              />
              {errors?.["password"] && (
                <em className="err-message">{errors["password"]}</em>
              )}
            </div>
          </div>
          <div className="form-group">
            {errors?.["frm_subms"] && (
              <em className="err-message">{errors["frm_subms"]}</em>
            )}
          </div>

          <button onClick={(e) => handleLogin(e)}>Sign Up</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
