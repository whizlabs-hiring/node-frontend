/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
const url = import.meta.env.VITE_API_URL;
const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    // Email validation
    if (formData.email === "" || formData.email === null) {
      isValid = false;
      validationErrors.email = "Email required; ";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Email is not valid; ";
    }

    // Password validation
    if (formData.password === "" || formData.password === null) {
      isValid = false;
      validationErrors.password = "Password required; ";
    } else if (formData.password.length < 6) {
      isValid = false;
      validationErrors.password = "Password length must be at least 6 characters; ";
    }

    if (!isValid) {
      setErrors(validationErrors);
      setValid(isValid);
      return;
    }

    try {
      const result = await axios.post(`${url}/auth/login`, formData)
      console.log(result.data);

      const user = result.data;

      if (result.data.status) {
        if (result.data.token != "") {
          // Call the login function from context
          login(user);
          alert("Login successfully");
          navigate('/');
        } else {
          validationErrors.password = "Invalid username/password";
          setErrors(validationErrors);
          setValid(false);
        }
      } else {
        validationErrors.email = "Email not found";
        setErrors(validationErrors);
        setValid(false);
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="signup-form">
            <form
              className="mt-5 border p-4 bg-light shadow"
              onSubmit={handleSubmit}
            >
              <h4 className="mb-5 text-secondary">Login</h4>
              {valid ? null : (
                <span className="text-danger">
                  {errors.email} {errors.password}
                </span>
              )}
              <div className="row">
                {/* Email  */}
                <div className="mb-3 col-md-12">
                  <label>
                    Email<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    autoComplete="off"
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                  />
                </div>
                {/* Password  */}
                <div className="mb-3 col-md-12">
                  <label>
                    Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={(event) =>
                      setFormData({ ...formData, password: event.target.value })
                    }
                  />
                </div>

                <div className="col-md-12">
                  <button className="btn btn-primary">Login Now</button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3 text-secondary">
              If you don't have an account, Please <Link to="/registration">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
