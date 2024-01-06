import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Link } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

const HRPopupForm = ({ onClose }) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
  return (
    <div className="popup-form">
     {/* <button
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
      </button> */}
      <Dialog open={handleClickOpen} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle style={{ fontSize: "30px", fontWeight: "600" , textAlign:'center' }}>
         LOGIN
        </DialogTitle>
        <DialogContent>
          
      <DialogContentText sx={{textAlign:'center' ,fontSize:'15px'}}>Welcome to Bytewise Manager</DialogContentText>
         
        </DialogContent>
        <DialogActions sx={{justifyContent: 'center',  marginBottom:'20px'}}>
        <Link to='/dashboard'><Button
            className=" text-white  p-2"
            style={{ backgroundColor: "#1B1A47" }}
            // onClick={handleSubmit}
            // onClick={handleClose}
          >
          As an Admin  
          </Button></Link>

          {/* Cancel Button */}
         <Link to='/user-dashboard'> <Button
            // onClick={handleClose}
            className=" p-2 fw-bold"
            style={{ color: "#1B1A47", backgroundColor: "#E7E7E7" }}
          >
            As an Employee
          </Button></Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HRPopupForm;
