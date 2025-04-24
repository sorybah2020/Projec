import Validation from "../utilities/Validation";
import LoginAPI from "../services/LoginAPI";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import RaundedCharts from "../assets/rounded_charts.svg";
import Charts from "../assets/charts.svg";
import VisibleIcon from "../assets/eye-open.svg";
import VisibleClosed from "../assets/eye-closed.svg";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  let navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
    setIsLoading(true);
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
        setIsLoading(false);
        return;
      } else {
        //login successful
        localStorage.setItem("email", result.email);
        setTimeout(() => {
          setAuth(result);
          setIsLoading(false);
          navigate("/transactions"); //navigate to transactions page
        }, 1500);
      }
    } else {
      setIsLoading(false);
      return;
    }
  };
  return (
    <>
      <nav className="navbar">
        <div className="container login">
          <Logo />
        </div>
      </nav>
      <main>
        <div className="hero">
          <div className="hero-container">
            <img src={RaundedCharts} className="rounded-chart" />
            <img src={Charts} className="lined-chart" />
            <div className="hero-text">
              <div className="hero-text-container">
                <h1>
                  Track your finances <p className="new-line">Easily</p>
                </h1>
                <p className="hero-description">
                  E-tracker helps you to track your expenses and manage your
                  finances efficiently. Log in to your account to get started.
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
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Password"
                      required
                      name="password"
                      onChange={(e) => handleChange(e.target)}
                    />
                    <img
                      src={showPassword ? VisibleIcon : VisibleClosed}
                      alt="eye"
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
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
                  Login {loading && <Spinner widthVal="25px" />}
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
      </main>
      <Footer />
    </>
  );
};

export default Login;
