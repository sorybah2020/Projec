import { useNavigate } from "react-router-dom";
import Validation from "../utilities/Validation";
import { useState } from "react";
import LoginAPI from "../services/LoginAPI";
import { Link } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const reqFields = ["email", "password"];

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

      const result = await LoginAPI.login(options); //submit user info

      if (result.message) {
        //an error occurred
        setErrors((prevErrors) => ({
          ...prevErrors,
          frm_subms: result.message,
        }));
        return;
      } else {
        navigate("/transactions"); //navigate to transactions page
      }
    }
  };
  return (
    <>
      <div id="signup-form" className="form-container">
        <h2>Welcome Back</h2>
        <form>
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

          <button onClick={(e) => handleLogin(e)}>Login</button>
          <p>
            Register <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
