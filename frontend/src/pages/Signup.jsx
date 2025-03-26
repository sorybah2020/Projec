import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    signupUsername: "",
    signupEmail: "",
    signupPassword: "",
  });

  const reqFields = ["signup-username", "signup-email", "signup-password"];

  const validateAll = (formData) => {
    let newErrors = {};
    let valid = true;

    reqFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Required field.";
        valid = false;
      }
    });

    return { valid, newErrors };
  };
  const handleChange = (input) => {
    const { name, value } = input;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { valid, newErrors } = validateAll(formData);
    setErrors(newErrors);
    console.log(valid, newErrors);
  };
  return (
    <>
      <div className="container">
        <div id="signup-form" className="form-container">
          <h2>Sign Up</h2>
          <input
            type="text"
            id="signup-username"
            placeholder="Username"
            required
            name="signupUsername"
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type="email"
            id="signup-email"
            name="signupEmail"
            placeholder="Email"
            required
            onChange={(e) => handleChange(e.target)}
          />
          <input
            type="password"
            id="signupPassword"
            placeholder="Password"
            required
            name="signupPassword"
            onChange={(e) => handleChange(e.target)}
          />
          <button onClick={(e) => handleLogin(e)}>Sign Up</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
