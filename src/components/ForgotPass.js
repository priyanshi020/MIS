import * as React from "react";
import PropTypes from "prop-types";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../components/signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams } from 'react-router-dom';

import { Link } from "react-router-dom";


export default function ForgotPass({ forgotPasswordUUID }) {
    const [uuid, setUUID] = useState(forgotPasswordUUID);
    // const { uuid } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const navigate = useNavigate();


  const handleSubmit=(e)=>{
    e.preventDefault();
    if(password===confirmPassword){
        const resetPasswordEndpoint = `http://localhost:8080/bytesfarms/user/updatePassword?UUID=${uuid}&password=${password}`;

        // Make a POST request to the reset password endpoint
        axios.post(resetPasswordEndpoint)
          .then((response) => {
            // ... (your existing code)
          })
          .catch((error) => {
            // ... (your existing code)
          });
    }else{
        setPasswordsMatch(false);
         toast.error("Passwords do not match.");
    }
  }
  



  
  return (
    <section
      className=" gradient-custom pt-5 "
      style={{
        backgroundImage: `url(assets/bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <ToastContainer />
      <div className="container  py-5 h-25" style={{ overflow: "hidden" }}>
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5  ">
            <div
              className="card  text-white shadow shadow-lg"
              style={{ borderRadius: "1rem", backgroundColor: "white" }}
            >
              <div className="card-body pb-5 text-center">
                <div className=" mt-md-4 ">
                  <div className="text-center pb-5">
                    <img
                      src="assets/ByteWiseLogo.png"
                      style={{ width: "185px" }}
                      alt="logo"
                    />
                    <h4 className="pt-4 mt-4 text-dark">
                    Create a new password
                    </h4>
                  </div>
                  <Box sx={{ width: "100%" }}>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-black mb-4 d-flex flex-column align-items-start">
                        <label className="text-dark mb-2" htmlFor="typeEmailX">
                          New Password
                        </label>
                        <input
                           type={showPassword ? "text" : "password"}
                           id="typePasswordX"
                           placeholder="Enter Your Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="form-control form-control-md "
                           style={{ width: "450px" }}
                        />
                          <i
                            className={`bi bi-eye${
                              showPassword ? "-slash" : ""
                            } position-absolute  top-50 translate-middle-y`}
                            style={{
                              cursor: "pointer",
                              color: "black",
                              right: "10px",
                            }}
                            onClick={togglePasswordVisibility}
                          ></i>
                      </div>
                      <div className="form-outline form-black  d-flex flex-column align-items-start">
                        <label
                          className="form-label text-dark mb-2"
                          htmlFor="typePasswordX"
                        >
                           Confirm Password
                        </label>
                        <div className="position-relative mb-5">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="typePasswordX"
                            placeholder="Enter Your Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control form-control-md "
                            style={{ width: "450px" }}
                          />
                          <i
                            className={`bi bi-eye${
                              showConfirmPassword ? "-slash" : ""
                            } position-absolute  top-50 translate-middle-y`}
                            style={{
                              cursor: "pointer",
                              color: "black",
                              right: "10px",
                            }}
                            onClick={toggleConfirmPasswordVisibility}
                          ></i>
                        </div>
                      </div>
                     
                      <button
                        className="btn btn-dark btn-lg w-50"
                        type="submit"
                        style={{
                          transition: "background-color 0.3s",
                          backgroundColor: "#1B1A47",
                          color: "white",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "white";
                          e.target.style.color = "#1B1A47";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#1B1A47";
                          e.target.style.color = "white";
                        }}
                      >
                        Reset Password
                      </button>{" "}
                    </form>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
