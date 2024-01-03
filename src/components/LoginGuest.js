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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const guest = "guest";
  const loginEndpoint = "http://localhost:8080/bytesfarms/user/signup";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Role:", role);
    const data = {
      username: username,
      email: email,
      password: password,
      role: {
        // id: null,
        roleName: role,
      },
    };
    // try {
    //   const response = axios.post(loginEndpoint, data);
    //   console.log("User added successfully:", response.data);
    //   const userRole = response.data.role.roleName;

    //   const userId=response.data.id;
    //   console.log("yeh hu userdi h ",userId)
    //   localStorage.setItem("userId", userId);

    // } catch (error) {
    //   console.error("Error adding user:", error.message);
    // }
    axios
      .post(loginEndpoint, data)
      .then((response) => {
        console.log("Signup successful:", response.data);
      })
      .catch((error) => {
        console.error("Signup failed:", error.response.data);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <div className="container  py-5 h-100">
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
                    <CustomTabPanel value={value} index={0}>
                      <form onSubmit={handleSubmit}>
                        <div className="form-outline form-black mb-4 d-flex flex-column align-items-start">
                          <label
                            className="text-dark mb-2"
                            htmlFor="typeEmailX"
                          >
                            Name
                          </label>
                          <input
                            type="name"
                            id="typeNameX"
                            placeholder="Username"
                            className="form-control form-control-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
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
                        <div className="form-outline form-black d-flex flex-column align-items-start mt-3">
                          <label
                            for="role"
                            className="form-label text-dark mb-2"
                            htmlFor="typePasswordX"
                          >
                            Role
                          </label>
                          <select
                            id="role"
                            className="form-control form-control-md"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value={guest}>Guest</option>
                          </select>
                        </div>
                       
                        <button
                          className="btn btn-dark btn-lg w-50 mt-3"
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
                          Send OTP
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
    </section>
  );
}
