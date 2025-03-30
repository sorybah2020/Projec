import { useNavigate } from "react-router-dom";
import Validation from "../utilities/Validation";
import { useState } from "react";
import LoginAPI from "../services/LoginAPI";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

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
        credentials: "include",
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
      <nav className="navbar">
        <div className="container">
          <Logo />
        </div>
      </nav>
      <div className="hero">
        <div></div>
        <div className="hero-container">
          <div className="hero-text">
            <div className="hero-text-container">
              <h1>Track your finances easily</h1>
              <p className="hero-description">
                E-tracker helps you to track your expenses and manage your
                finances efficiently. Log in to see if your pig is getting rich!
              </p>
            </div>
          </div>
          <div id="signup-form" className="form-container">
            <div className="form-header">
              <h2 className="form-header">Welcome</h2>
              <p>Log in to your E-tracker account</p>
            </div>

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

              <button className="btn" onClick={(e) => handleLogin(e)}>
                Login
              </button>
              <p className="more-info">
                {"Don't have an account?"}{" "}
                <Link to="/signup" className="sign-up-link">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
