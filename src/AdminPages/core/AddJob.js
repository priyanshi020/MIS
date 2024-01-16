import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function AddJob({ onJobAdded }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [openings, setOpenings] = useState(0);
  const [experience, setExperience] = useState(0);
  const [requirements, setRequirements] = useState("");
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const dataToAdd = {
      title: name,
      openings: openings,
      experience: experience,
      requirements: requirements,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/bytesfarms/recruitment/positions/add",
        dataToAdd
      );
      console.log("Job added successfully:", response.data);

      onJobAdded(response.data);
    } catch (error) {
      console.error("Error adding job:", error.message);
    }

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
        Add
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontSize: "30px", fontWeight: "600" }}>
          Add Job
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="openings"
            label="Openings"
            type="number"
            fullWidth
            variant="standard"
            value={openings}
            onChange={(e) => setOpenings(Number(e.target.value))}
          />

          <TextField
            autoFocus
            margin="dense"
            id="experience"
            label="Experience"
            type="number"
            fullWidth
            variant="standard"
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
          />

          <TextField
            autoFocus
            margin="dense"
            id="requirements"
            label="Requirements"
            type="text"
            fullWidth
            variant="standard"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
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

export default AddJob;
