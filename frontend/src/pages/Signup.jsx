import { Link } from "react-router-dom";
import { useState } from "react";
import SignupAPI from "../services/SignupAPI";
import { useNavigate } from "react-router-dom";
import Validation from "../utilities/Validation";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import RaundedCharts from "../assets/rounded_charts.svg";
import Charts from "../assets/charts.svg";

const Signup = () => {
  let navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //validate signup fields
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
      if (result.message) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          frm_subms: result.message,
        }));
        return;
      }
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login"); //navigate to login page
      }, 1500);
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
        <div className="hero sign-up-page">
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
                  finances efficiently. Sign Up in to your account to get
                  started.
                </p>
              </div>
            </div>
            <div id="signup-form" className="form-container">
              <div className="form-header">
                <h2 className="form-header">Welcome</h2>
                <p>Sign in to your E-tracker account</p>
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

                <button className="btn" onClick={(e) => handleSignUp(e)}>
                  Sign Up {loading && <Spinner widthVal="25px" />}
                </button>

                <p className="more-info">
                  {"Already have an account?"}{" "}
                  <Link to="/login" className="sign-up-link">
                    Log In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer className="signup-page" />
    </>
  );
};

export default Signup;
