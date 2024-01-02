import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddUser from "../components/AddUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCallback } from "react";

import Add from "./core/Add";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  console.log("selectedItemId0",selectedItemId)

  const[EditName,setEditName]=useState("")
  const handleName =(e)=>{
     setEditName(e.target.value);
  }
  const[EditEmail,setEditEmail]=useState("")
  const handleEmail =(e)=>{
     setEditEmail(e.target.value);
  }

  
  const [editData, setEditData] = useState({
    id: null,
    name: "",
   
    email: "",
   
  });

  const handleUserAdded = (newUser) => {
    // Update the data state by adding the new job
    setData((prevData) => [...prevData, newUser]);
    fetchData();
  };


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/bytesfarms/user/getEmployees")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };



  const handleMenuClick = (event, itemId) => {
    console.log("Item ID selected for editing:", itemId);
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  
    // Find the selected item in the existing data
    const selectedItem = data.find((item) => item.id === itemId);
  
    if (selectedItem) {
      setEditData({
        id: selectedItem.id,
        name: selectedItem.username,
        email: selectedItem.email,
      
      });
      setEditName(selectedItem.username);
      setEditEmail(selectedItem.email);
      setOpen(true); // Open the dialog for editing
    } else {
      console.error("Item not found for editing.");
    }
  };
  

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleEditClick = useCallback((itemId) => () => {
    console.log("Edit clicked for item with ID:", itemId);
    setSelectedItemId(itemId);
    setOpen(true);
  }, [handleMenuClose]); 

  

  const handleid=(item)=>{
    setSelectedItemId(item)
  }

  const handleDeleteClick = () => {
    if (!selectedItemId) {
      console.error("No item selected for deletion.");
      handleMenuClose();
      return;
    }

    console.log("Selected Item ID:", selectedItemId);
    const apiUrl = `http://localhost:8080/bytesfarms/user/delete?userId=${selectedItemId}`;
    console.log("API URL:", apiUrl);

    axios
      .delete(apiUrl)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting item:", error.message);
      })
      .finally(() => {
        handleMenuClose();
      });
  };

  const handleClose = () => {
    setOpen(false);
    setEditData({
      id: null,
      name: "",
      email: "",
      
    });
  };

  const handleEditApiCall = () => {
    const editData = {
      name: EditName,
      email: EditEmail,
     
    };

    axios
      .put(`http://localhost:8080/bytesfarms/user/update?userId=${selectedItemId}`, editData)
      .then((response) => {
        console.log("Edit API response:", response.data);
        // Update the data after successful edit
        fetchData();
      })
      .catch((error) => {
        console.error("Error editing item:", error.message);
      })
      .finally(() => {
        handleMenuClose();
        handleClose(); // Close the dialog
      });
  };


  return (
    <>
      <Sidebar />
      <main className="m-5" style={{backgroundColor:'#F0F5FD'}}>
        <div className="col-md-12 ">
          <div className="d-flex justify-content-between mb-3">
            <h2 className="mb-3 col-md-2">DASHBOARD</h2>
           
          </div>
          <div className="d-flex">
          <div className=" col-md-3 ">
                  <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                   <img src='/assets/dashboard/emp.png' alt="emp" className="mr-3" style={{width:'62px'}} />
                    <div className="d-flex  row">
                    <span
                      className="d-block mb-2"
                      style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        lineHeight: "28px",
                      }}
                    >
                      30
                    </span>
                    <p
                      className="mt-1 mb-2"
                      style={{ fontSize: '13px' ,fontWeight:'500' }}
                    >
                      Number of Employees
                    </p>
                    </div>
                  </div>
                </div>

                <div className=" col-md-3 ">
                <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                   <img src='/assets/dashboard/proj.png' alt="emp" className="mr-3" style={{width:'62px'}} />
                    <div className="d-flex  row">
                    <span
                      className="d-block mb-2"
                      style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        lineHeight: "28px",
                      }}
                    >
                      5
                    </span>
                    <p
                      className="mt-1 mb-2"
                      style={{ fontSize: '14px' ,fontWeight:'500' }}
                    >
                      Number of Project
                    </p>
                    </div>
                  </div>
                </div>
                <div className=" col-md-3 ">
                <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                   <img src='/assets/dashboard/pre.png' alt="emp" className="mr-3" style={{width:'62px'}} />
                    <div className="d-flex  row">
                    <span
                      className="d-block mb-2"
                      style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        lineHeight: "28px",
                      }}
                    >
                      30
                    </span>
                    <p
                      className="mt-1 mb-2"
                      style={{ fontSize: '14px' ,fontWeight:'500' }}
                    >
                      Present Today
                    </p>
                    </div>
                  </div>
                </div>
                <div className=" col-md-3 ">
                <div className="d-flex   p-3  shadow shadow-lg rounded-4 " style={{backgroundColor: "#1B1A47"}}>
                   <img src='/assets/dashboard/abs.png' alt="emp" className="mr-3" style={{width:'62px'}} />
                    <div className="d-flex  row">
                    <span
                      className="d-block mb-2 text-white"
                      style={{
                        fontSize: "32px",
                        fontWeight: "700",
                        lineHeight: "28px",
                      }}
                    >
                      00
                    </span>
                    <p
                      className="mt-1 mb-2 text-white"
                      style={{ fontSize: '14px' ,fontWeight:'500' }}
                    >
                      Absent Today
                    </p>
                    </div>
                  </div>
                </div>
          
          </div>
        </div>
        <div className="container pt-5">
          <table class="table rounded-4 " >
            <thead class="table-secondary p-2">
              <tr>
                <th  className='text-center' scope="col">S.No</th>
                <th scope="col">Name</th>
                {/* <th scope="col">Designation</th> */}
                <th scope="col">Email Id</th>
              

                <th className="text-right " style={{width:'0px'}}>
             
                  <Add onUserAdded={handleUserAdded}/>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.username}</td>
                  {/* <td>{item.designation}</td> */}
                  <td>{item.email}</td>
                

                  <td className="text-right">
                    <IconButton aria-haspopup="true"   onClick={(event) => handleMenuClick(event, item.id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem  onClick={handleEditClick(item.id)}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                    </Menu>
                  </td>
                  <Dialog open={open} onClose={handleClose} className="p-5 ">
                    <DialogTitle
                      className="text-center"
                      style={{ fontSize: "30px", fontWeight: "600" }}
                    >
                      Edit
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
                                // value={editData.name}
                                // onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                value={EditName}
                                onChange={handleName}
                              />
                            </div>
                          </div>
                          {/* <div class="col mb-4">
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
                              />
                            </div>
                          </div> */}
                       
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
                              // value={editData.email}
                              // onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                              value={EditEmail}
                              onChange={handleEmail}
                            />
                          </div>
                          </div>
                          {/* <div data-mdb-input-init class="form-outline mb-4">
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
                              value={editData.phone}
                              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            />
                          </div> */}
                        </div>
                      </form>
                    </DialogContent>
                    <DialogActions className="justify-content-start p-3">
                      <Button
                        className=" text-white w-25 p-2"
                        style={{ backgroundColor: "#1B1A47" }}
                        onClick={handleEditApiCall}
                      >
                        Edit
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
                </tr>
              ))}
            </tbody>
          </table>



        </div>


        
      </main>
    </>
  );
};

export default Dashboard;
