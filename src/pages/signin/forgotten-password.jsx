import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
        {
          email,
        }
      );

      if (response.data.success) {
        toast.success("Password reset link sent. Please check your email.", {
          hideProgressBar: true
        });
      } else {
        toast.error("Error sending reset link. Please try again.", {
          hideProgressBar: true
        });
      }

    } catch (error) {
      toast.error("Error sending reset link. Please try again.", {
        hideProgressBar: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signIn mb-5">
      <div className="breadcrumbWrapper res-hide">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li>
              <Link to="/" className="text-dark">
                Home
              </Link>
            </li>
            <li>Forgot Password</li>
          </ul>
        </div>
      </div>

      <div className="loginWrapper">
        <div className="card shadow">
          <h5>Enter Email</h5>
          <form className="pt-3" onSubmit={handleSubmit}>
            <div className="form-group mb-4 w-100">
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email"
                value={email}
                onChange={handleChange}
                className="w-100"
                autoComplete="off"
                required
              />
            </div>
            <Button
              type="submit"
              className="btn-g w-100 text-capitalize"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
            </Button>

            <div className="text-center pt-2">
              Return to{" "}
              <Link to="/signin" className="text-decoration-none fw-bold">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPass;
