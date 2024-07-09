import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { signupToApi } from "../../../utils/api"; // Adjust the import path as necessary
import "./signin.css";

const initialUser = {
  email: "",
  password: "",
  confirmPass: "",
  username: "",
};

const Signup = () => {
  const [user, setUser] = useState(initialUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      // Check if the user already exists
      // const userExists = await checkUserExists(user.email, user.username);
      // if (userExists) {
      //   toast.error("User with this email or username already exists",{
      //     position: 'bottom-right',
      //   });
      //   return;
      // }

      // Proceed with signup
      const res = await signupToApi('/auth/local/register', {
        username: user.username,
        email: user.email,
        password: user.password,
      });

      if (res) {
        setUser(initialUser);
        navigate('/signin');
        toast.success("Signup Successful",{
          position: 'bottom-right',
        });
      }
    } catch (error) {
      return error
    }
  };

  const validateInputs = () => {
    if (!user.username || !user.email || !user.password || !user.confirmPass) {
      toast.error("Please fill in all fields",{
        position: 'bottom-right',
      });
      return false;
    }

    if (!validateEmail(user.email)) {
      toast.error("Invalid email format",{
        position: 'bottom-right',
      });
      return false;
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters long",{
        position: 'bottom-right',
      });
      return false;
    }

    if (user.password !== user.confirmPass) {
      toast.error("Passwords do not match",{
        position: 'bottom-right',
      });

      return false;
    }

    return true;
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <section className="signIn mb-5">
      <div className="breadcrumbWrapper res-hide">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Sign up</li>
          </ul>
        </div>
      </div>

      <div className="loginWrapper">
        <div className="card shadow">
          <h3>Sign Up</h3>
          <form className="pt-3" autoComplete="off">
            <div className="form-group mb-4 w-100">
              <TextField
                id="username"
                type="text"
                name="username"
                label="Username"
                value={user.username}
                onChange={handleChange}
                className="w-100"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-4 w-100">
              <TextField
                id="email"
                type="text"
                name="email"
                label="Email"
                value={user.email}
                onChange={handleChange}
                className="w-100"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-4 w-100 position-relative">
              <TextField
                id="password"
                type={showPassword === false ? "password" : "text"}
                name="password"
                label="Password"
                value={user.password}
                onChange={handleChange}
                className="w-100"
                autoComplete="new-password"
              />
              <Button
                className="icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword === false ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </Button>
            </div>
            <div className="form-group mb-4 w-100 position-relative">
              <TextField
                id="confirmPass"
                type={showPassword1 === false ? "password" : "text"}
                name="confirmPass"
                label="Confirm Password"
                value={user.confirmPass}
                onChange={handleChange}
                className="w-100"
                autoComplete="new-password"
              />
              <Button
                className="icon"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 === false ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </Button>
            </div>
            <div className="form-group mb-4 w-100">
              <Button
                className="btn-g w-100 text-capitalize"
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </div>
            <div className="text-center">
              Already have an Account?{" "}
              <Link to={"/signin"} className="text-decoration-none fw-bold">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
