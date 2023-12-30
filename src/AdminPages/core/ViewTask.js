import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function ViewTask({ userId }) {
  const [open, setOpen] = useState(false);
 
  const [data,setData]=useState();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bytesfarms/tasks/get?userId=${userId}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
  
    fetchData();
  }, [userId]);
 


  return (
    <>
    <div className="container">
      <button
        variant="outlined"
        onClick={handleClickOpen}
        id="addbutton"
        className="btn btn-primary btn-sm-3 rounded-3  "
        type="button"
        title="Add"
      >
        {/* <i className="fa fa-table"></i> */}
        View Task
      </button>
      <Dialog open={open} onClose={handleClose} className="p-5"  maxWidth="md">
        <DialogTitle style={{ fontSize: "25px", fontWeight: "600" }}>
          Task List
        </DialogTitle>
        <DialogContent>
          <table class="    rounded-4 table table-responsive-lg  ">
            <thead class="table-secondary text-center">
              <tr className="">
                <th className="" style={{padding:'20px'}} >Date</th>

                <th className="" style={{padding:'20px'}}>Task </th>
                <th className="" style={{padding:'20px'}}>Expected time </th>
                <th className="" style={{padding:'20px'}}>Actual Time </th>
                <th className="" style={{padding:'20px'}}>Status </th>
              </tr>
            </thead>
           {data ? (
  <tbody className="text-center">
    {data.map((item) => (
      <tr key={item.date}>
        <td className="text-center">{item.date}</td>
        <td>{item.taskDescription}</td>
        <td>{item.expectedTime}</td>
        <td>{item.actualTime}</td>
        <td>{item.status}</td>
      </tr>
    ))}
  </tbody>
) : (
  <p>Loading...</p>
)}

          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className=" text-white" style={{backgroundColor:"#1B1A47"}}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}

export default ViewTask;
