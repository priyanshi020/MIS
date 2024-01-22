import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
function AddUser({ onUserAdded }) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const admin = "Admin";
  const employee = "Employee";
  const hr="HR";

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginEndpoint = "http://localhost:8080/bytesfarms/user/signup";

  const handleSubmit = async () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
  
    if (!passwordRegex.test(password)) {
      toast.error('Must contain 8 characters including one capital, one small letter, and one symbol');
      return;
    }
  
    const dataToAdd = {
      username: username,
      email: email,
      password: password,
      role: {
        roleName: role,
      },
    };
  
    try {
      console.log("Request data:", dataToAdd);
      const response = await axios.post(loginEndpoint, dataToAdd);
      console.log("Response:", response);
  
      if (response && response.data) {
        console.log("User added successfully:", response.data);
        onUserAdded(response.data);
        toast.success('User Added Successfully');
      } else {
        console.error("Invalid response structure:", response);
        toast.error('Error adding user. Please try again.');
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
      toast.error('Error adding user. Please try again.');
    }
  
    setOpen(false);
  };
  
  return (
    <div className="container">
      <button
        className="btn btn-dark btn-sm-3 w-100"
        onClick={handleClickOpen}
        type="button"
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
        Add
        {/* <img src='/assets/add.png' alt='icon' className="ml-2"/> */}
      </button>
      <ToastContainer  position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-center"/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontSize: "30px", fontWeight: "600" }}>
          Add User
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="UserName"
            type="text"
            fullWidth
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="Email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            // type={showPassword ? "text" : "password"}
            // type="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         
                            <i
                              className={`bi bi-eye${
                                showPassword ? "-slash" : ""
                              } position-absolute  top-75 translate-middle-y`}
                              style={{ cursor: "pointer" ,color:'black' ,right:'46px',top:'232px  '}}
                              onClick={togglePasswordVisibility}
                            ></i>
          <TextField
            id="role"
            select
            label="Role"
            fullWidth
            variant="standard"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value={admin}>Admin</MenuItem>
            <MenuItem value={employee}>User</MenuItem>
            <MenuItem value={hr}>HR</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className=" text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className=" text-white"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddUser;
