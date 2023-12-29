import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SettingsPhone } from "@mui/icons-material";

function AddUser() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
const [phone,setPhone]=useState("");

  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
     
    };

    setOpen(false);
  };

  return (
    <div className="container">
      <button
        variant="outlined"
        onClick={handleClickOpen}
        id="addbutton"
        className="btn  btn-sm-3 rounded-3  "
        style={{ backgroundColor: "#1B1A47", color: "white" }}
        type="button"
        title="Add"
      >
        {/* <i className="fa fa-table"></i> */}
        Add
      </button>

      <Dialog open={open} onClose={handleClose} className="p-5 ">
        <DialogTitle
          className="text-center"
          style={{ fontSize: "30px", fontWeight: "600" }}
        >
          Add User
        </DialogTitle>
        <DialogContent>
          <form>
            <div class="row ">
              <div class="col mb-4">
                <div data-mdb-input-init class="form-outline">
                  <label
                    class="form-label fw-bold text-secondary"
                    for="form6Example1"
                  >
                    {" "}
                    NAME
                  </label>
                  <input
                    type="text"
                    id="form6Example1"
                    class="form-control form-control-lg"
                    placeholder="Name"
                    style={{  fontSize: "16px", color: "#666666" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div class="col mb-4">
                <div data-mdb-input-init class="form-outline">
                  <label
                    class="form-label fw-bold text-secondary"
                    for="form6Example1"
                  >
                    {" "}
                    DESIGNATION
                  </label>
                  <input
                    type="text"
                    id="form6Example2"
                    class="form-control form-control-lg"
                    placeholder="Designation"
                    style={{  fontSize: "16px", color: "#666666" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div data-mdb-input-init class="form-outline mb-4">
                <label
                  class="form-label fw-bold text-secondary"
                  for="form6Example1"
                >
                  {" "}
                  EMAIL
                </label>
                <input
                  type="email"
                  id="form6Example5"
                  class="form-control form-control-lg"
                  placeholder="Email"
                  style={{  fontSize: "16px", color: "#666666" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <label
                  class="form-label fw-bold text-secondary"
                  for="form6Example1"
                >
                  CONTACT NO.
                </label>
                <input
                  type="phone"
                  id="form6Example6"
                  class="form-control form-control-lg"
                  placeholder="Contact no"
                  style={{  fontSize: "16px", color: "#666666" }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className="justify-content-start p-3">
          <Button
            className=" text-white w-25 p-2"
            style={{ backgroundColor: "#1B1A47" }}
          >
            Add{" "}
          </Button>
          <Button
            onClick={handleClose}
            className="  w-25 p-2 fw-bold"
            style={{ color: "#1B1A47", backgroundColor: "#E7E7E7" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontSize: "30px", fontWeight: "600" }}>
          Add User
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
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
            label="Designation"
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
            id="phone"
            label="Contact No"
            type="number"
            fullWidth
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="date"
            // label="Joining Date"
            type="date"
            fullWidth
            variant="standard"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className=" text-white" style={{backgroundColor:"#1B1A47"}}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className=" text-white" style={{backgroundColor:"#1B1A47"}}>
            Add
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}

export default AddUser;
