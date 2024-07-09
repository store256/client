import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button, CircularProgress } from "@mui/material";
import GoogleImg from "../../assets/images/google.png";
import { toast } from "react-toastify";
import { login } from "../../redux/userSlice";
import { fetchDataFromApi } from "../../../utils/api";
import { GoogleLogin } from '@react-oauth/google';
import { loginToApi } from "../../../utils/api";
const initialUser = { email: "", password: "" };

const Signin = () => {
  const [user, setUser] = useState(initialUser);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (user.email && user.password) {
      setLoading(true); // Set loading to true when login process starts
      dispatch(login(user))
        .unwrap()
        .then(() => {
          navigate('/');
          toast.success("Login Successful", {
            hideProgressBar: true,
            position: 'bottom-right',
          });
        })
        .catch((error) => {
          toast.error("Login failed: " + error.message, {
            hideProgressBar: true,
            position: 'bottom-right',
          });
        })
        .finally(() => {
          setLoading(false); // Set loading to false after login process completes
        });
    } else {
      toast.error("Please fill in all fields", {
        hideProgressBar: true,
        position: 'bottom-right',
      });
    }
  };

  const handleLoginSuccess = async () => {
    try {
      const res= loginToApi('/connect/google/callback')
      if(res){
        console.log(res)
        toast.success(res, {
          hideProgressBar: true,
        });
      }
      
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <section className="signIn mb-5">
      <div className="breadcrumbWrapper res-hide">
        <div className="container-fluid">
          <ul className="breadcrumb breadcrumb2 mb-0">
            <li>
              <Link to={"/"} className="text-dark">
                Home
              </Link>
            </li>
            <li>Sign in</li>
          </ul>
        </div>
      </div>

      <div className="loginWrapper">
        <div className="card shadow">
          <h3>Sign In</h3>
          <form className="pt-3">
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
                autoComplete="off"
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
            <div className="form-group mb-4 w-100">
            <Button 
              className="btn-g w-100 text-capitalize"
              onClick={handleLogin}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" /> 
              ) : (
                "Sign In"
              )}
              </Button>
            </div>
            {/* <div className="form-group mb-4 w-100 signinOr">
              <p className="text-center">OR</p>

              <Button className="w-100 text-capitalize" variant="outlined" onClick={handleLoginSuccess }>
                <img src={GoogleImg} className="w-100" alt="Google Logo" /> Sign in with Google
              </Button>
            </div> */}

            <div className="text-center">
              Not have an account?{" "}
              <Link to={"/signup"} className="text-decoration-none fw-bold">
                Sign Up
              </Link>
            </div>
            {/* <div className="text-center">
              Forfotten Password?{" "}
              <Link to={"/forgotten-password"} className="text-decoration-none fw-bold text-primary">
               Reset
              </Link>
            </div> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;
