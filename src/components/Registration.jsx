import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const url = import.meta.env.VITE_API_URL;


const Registration = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true; 
    let validationErrors = {};

    if (formData.fname.trim() === "") {
      isValid = false;
      validationErrors.fname = "First name required; ";
    }
    if (formData.lname.trim() === "") {
      isValid = false;
      validationErrors.lname = "Last name required; ";
    }
    if (formData.email.trim() === "") {
      isValid = false;
      validationErrors.email = "Email required; ";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Email is not valid; ";
    }
    if (formData.password.trim() === "") {
      isValid = false;
      validationErrors.password = "Password required; ";
    } else if (formData.password.length < 6) {
      isValid = false;
      validationErrors.password = "Password length at least 6 characters; ";
    }
    if (formData.cpassword !== formData.password) {
      isValid = false;
      validationErrors.cpassword = "Confirm password does not match; ";
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await axios.post(`${url}/auth/register`, formData);
        alert("Registered Successfully");
        navigate('/login');
      } catch (err) {
        console.error(err);
        alert("An error occurred while registering. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="signup-form">
            <form className="mt-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
              <h4 className="mb-5 text-secondary">Create Your Account</h4>
              {!valid && (
                <span className="text-danger">
                  {errors.fname} {errors.lname} {errors.email} 
                  {errors.password} {errors.cpassword}
                </span>
              )}
              <div className="row">
                {/* First name  */}
                <div className="mb-3 col-md-6">
                  <label>
                    First Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="fname"
                    className="form-control"
                    placeholder="Enter First Name"
                    onChange={(event) => setFormData({ ...formData, fname: event.target.value })}
                  />
                </div>
                {/* Last Name  */}
                <div className="mb-3 col-md-6">
                  <label>
                    Last Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="lname"
                    className="form-control"
                    placeholder="Enter Last Name"
                    onChange={(event) => setFormData({ ...formData, lname: event.target.value })}
                  />
                </div>
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
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
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
                    onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                  />
                </div>
                {/* Confirm Password */}
                <div className="mb-3 col-md-12">
                  <label>
                    Confirm Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(event) => setFormData({ ...formData, cpassword: event.target.value })}
                  />
                </div>
                <div className="col-md-12">
                  <button className="btn btn-primary">Signup Now</button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3 text-secondary">
              If you have an account, Please <Link to="/login">Login Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
