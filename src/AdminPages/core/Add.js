import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const admin = "admin";
  const employee = "employee";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginEndpoint = "http://localhost:8080/bytesfarms/user/signup";

  const handleSubmit = (e) => {
    // e.preventDefault();
    const data = {
      username: name,
      email: email,
      password: password,
      role: {
        roleName: role,
      },
    };
    try {
      const response = axios.post(loginEndpoint, data);
      console.log("User added successfully:", response.data);

      onUserAdded(response.data);
    } catch (error) {
      console.error("Error adding user:", error.message);
    }

    setOpen(false);
  };

  return (
    <div className="container">
      <button
        className="btn btn-dark btn-lg w-100"
        onClick={handleClickOpen}
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
        Add
      </button>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            type="text"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
