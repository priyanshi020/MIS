import React ,{useState}from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const AddPolicy = ({onPolicyAdded}) => {
    const [open, setOpen] = React.useState(false);
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");

    const handleClickOpen=()=>{
        setOpen(true);
    };

    const handleClose=()=>{
        setOpen(false);
    }

    const handleSubmit=async()=>{
        const dataToAdd={
            title:title,
            content:content,
        };
        try{
            const response = await axios.post(
                "http://localhost:8080/bytesfarms/policy/create/new",
                dataToAdd
              );
              console.log("Policy added successfully:", response.data);
        
              onPolicyAdded(response.data);
        }catch (error) {
            console.error("Error adding job:", error.message);
          }
          setOpen(false);
    }

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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Content"
            multitline
            rows={8}
            type="text"
            fullWidth
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value) }
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

  )
}

export default AddPolicy