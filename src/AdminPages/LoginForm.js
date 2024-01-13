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
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNearOffice, setIsNearOffice] = useState(false);

  const navigate = useNavigate();

  const loginEndpoint = "http://localhost:8080/bytesfarms/user/signin";

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
  
    // Check location before making the API call
    checkLocationBeforeLogin();
  };
  
  const checkLocationBeforeLogin = () => {
    // Show loader initially
    setLoading(true);
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
  
        console.log("This is user's latitude: " + userLatitude);
        console.log("This is user's longitude: " + userLongitude);
  
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          22.744928,
          75.892278
        );
        console.log(
          "This is the distance between two places in meters: " + distance
        );
  
        console.log("Location Validated");
  
        if (distance <= 500) {
          setIsNearOffice(true);
          loginUser(); // Proceed with login after validating location
        } else {
          toast.error("You are not near the office.", {
            onClose: () => {
              // Delay for 1000 milliseconds (1 second) before hiding the loader
              setTimeout(() => setLoading(false), 7000);
            },
            autoClose: 6000
          });
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Need location to log in.", {
          onClose: () => {
            // Delay for 1000 milliseconds (1 second) before hiding the loader
            setTimeout(() => setLoading(false), 7000);
          },
          autoClose:6000
        });
      }
    );
  };
  
  const loginUser = () => {
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
        const userName = response.data.username;
        console.log("This is user id ", userId);
        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("userName", userName);
  
        // Navigate based on user role
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
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCloseHRPopup = () => {
    // Close HR pop-up form
    setHRPopupOpen(false);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude from degrees to radians
    const toRadians = (angle) => {
      return angle * (Math.PI / 180);
    };

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance in kilometers and convert to meters
    const distanceInMeters = earthRadius * c * 1000;

    return distanceInMeters;
  };

  const handleForgotPassword = () => {
    // Add logic to send a request for password reset
    const forgotPasswordEndpoint = `http://localhost:8080/bytesfarms/user/forgotPassword?email=${email}`;

    axios
      .post(forgotPasswordEndpoint)
      .then((response) => {
        const resetUuid = response.data;

        localStorage.setItem("resetUuid", resetUuid);
        console.log("Password reset request successful:", response.data);
        toast.success(
          "Password reset request sent. Check your email for further instructions."
        );
      })
      .catch((error) => {
        console.error("Password reset request failed:", error.response.data);
        toast.error("Password reset request failed. Please try again.");
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-center"
      />

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
                    <CustomTabPanel value={value} index={0}>
                      <form onSubmit={handleSubmit}>
                        <div className="form-outline form-black mb-4 d-flex flex-column align-items-start">
                          <label
                            className="text-dark mb-2"
                            htmlFor="typeEmailX"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="typeEmailX"
                            placeholder="Enter Your Email"
                            className="form-control form-control-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-outline form-black  d-flex flex-column align-items-start">
                          <label
                            className="form-label text-dark mb-2"
                            htmlFor="typePasswordX"
                          >
                            Password
                          </label>
                          <div className="position-relative mb-2">
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
                        </div>
                        <p className="small mb-5 pb-lg-2 text-end">
                          <a
                            className="text-dark-50"
                            href="#!"
                            onClick={handleForgotPassword}
                          >
                            Forgot password?
                          </a>
                        </p>
                        <button
                          onClick={handleSubmit}
                          className="btn btn-dark btn-lg w-50 rounded-3"
                          type="button"
                          style={{
                            transition: "background-color 0.3s",
                            backgroundColor: "#1B1A47",
                            color: "white",
                            position: "relative", // Ensure position is relative for absolute positioning of the loader
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = "white";
                            e.target.style.color = "#1B1A47";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#1B1A47";
                            e.target.style.color = "white";
                          }}
                          disabled={loading}
                        >
                          {loading && (
                            <span
                              className="loader-spinner"
                              style={{
                               
                                position: "absolute",
                                top: "20%",
                                left: "80%",
                                transform: "translate(-50%, -50%)",
                              }}
                            ></span>
                          )}
                          {loading ? " Logging In.." : "Login"}
                        </button>
                      </form>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <form onSubmit={handleSubmit}>
                        <div className="form-outline form-black mb-4 d-flex flex-column align-items-start">
                          <label
                            className="text-dark mb-2"
                            htmlFor="typeEmailX"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="typeEmailX"
                            placeholder="example@gmail.com"
                            className="form-control form-control-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                              className="form-control form-control-md "
                              style={{ width: "450px" }}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
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
                          <a className="text-dark-50" href="#!">
                            Forgot password?
                          </a>
                        </p>
                        <button
                          onSubmit={handleSubmit}
                          className="btn btn-dark btn-lg w-50 rounded-3"
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
                    </CustomTabPanel>
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
