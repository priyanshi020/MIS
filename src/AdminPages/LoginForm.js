import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../components/signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import HRPopupForm from "./core/HRPopForm";
import { Link } from "react-router-dom";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Mus() {
  const [value, setValue] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isHRPopupOpen, setHRPopupOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginEndpoint = "http://localhost:8080/bytesfarms/user/signin";
  const forgotPasswordEndpoint =
    "http://localhost:8080/bytesfarms/user/forgotPassword";
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };
    axios
      .post(loginEndpoint, userData)
      .then((response) => {
        console.log("Login successful:", response.data);
        const userRole = response.data.role.roleName;

        const userId = response.data.id;
        console.log("yeh hu userdi h ", userId);
        localStorage.setItem("userId", userId.toString());

        if (userRole === "Admin") {
          navigate("/dashboard");
        } else if (userRole === "Employee") {
          navigate("/user-dashboard");
        } else if (userRole === "HR") {
          setHRPopupOpen(true);
        } else {
          // Navigate to home or another page

          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error.response.data);
        toast.error("Login failed. Invalid email or password.");
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCloseHRPopup = () => {
    // Close HR pop-up form
    setHRPopupOpen(false);
  };

  const handleForgotPassword = () => {
    // Update the email state with the value entered in the "Forgot Password" section
    setEmail(forgotPasswordEmail);

    // Handle the "Forgot Password" functionality here
    // You can call the API to send a password reset link to the user's email
    axios
      .post(`${forgotPasswordEndpoint}?email=${forgotPasswordEmail}`)
      .then((response) => {
        // Handle the success case, e.g., show a success message to the user
        toast.success("Password reset link sent to your email.");
        const uuid = response.data.uuid;

        // Navigate to the ForgotPass component with the UUID as a parameter
        navigate(`/updatepassword?token=${uuid}`);
        
      })
      .catch((error) => {
        // Handle the error case, e.g., show an error message to the user
        console.error("Forgot Password failed:", error.response.data);
        toast.error("Forgot Password failed. Please try again.");
      });
  };
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
                      LOGIN TO YOUR ACCOUNT
                    </h4>
                  </div>
                  <Box sx={{ width: "100%" }}>
                    {/* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example  "
                        sx={{
                          "& .MuiTabs-indicator": {
                            backgroundColor: "orange",
                          },
                          "& .MuiTab-root": {
                            color: "black !important",
                            "&:hover": {
                              color: "orange",
                            },
                          },
                        }}
                      >
                        <Tab label="ADMIN" {...a11yProps(0)} />
                        <Tab label="USER" {...a11yProps(1)} />
                       
                      </Tabs>
                    </Box> */}

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-black mb-4 d-flex flex-column align-items-start">
                        <label className="text-dark mb-2" htmlFor="typeEmailX">
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="form-control form-control-md mb-2"
                          value={forgotPasswordEmail}
                          onChange={(e) =>
                            setForgotPasswordEmail(e.target.value)
                          }
                        />
                      </div>
                      <div className="form-outline form-black  d-flex flex-column align-items-start">
                        <label
                          className="form-label text-dark mb-2"
                          htmlFor="typePasswordX"
                        >
                          Password
                        </label>
                        <div className="position-relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="typePasswordX"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control form-control-md "
                            style={{ width: "490px" }}
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
                      </div>
                      <p className="small mb-5 pb-lg-2 text-end">
                        <Link
                          to="#"
                          onClick={handleForgotPassword}
                          className="text-dark-50"
                        >
                          Forgot Password?
                        </Link>
                      </p>
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
                        Login
                      </button>{" "}
                    </form>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isHRPopupOpen && <HRPopupForm onClose={handleCloseHRPopup} />}
    </section>
  );
}
