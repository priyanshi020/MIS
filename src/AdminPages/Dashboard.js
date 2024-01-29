import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import "./admin.css";
import { useCallback } from "react";
import Add from "./core/Add";

const Dashboard = () => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  console.log();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeCount, setEmployeeCount] = useState(0);
  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Search filter
  const filteredData = data.filter(
    (item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  console.log("selectedItemId0", selectedItemId);

  const [Editusername, setEditusername] = useState("");
  const handleusername = (e) => {
    setEditusername(e.target.value);
  };
  const [Editemail, setEditemail] = useState("");
  const handleemail = (e) => {
    setEditemail(e.target.value);
  };

  const [Editdesignation, setEditdesignation] = useState("");
  const handledesignation = (e) => {
    setEditdesignation(e.target.value);
  };

  const [editData, setEditData] = useState({
    id: null,
    username: "",
    email: "",
    profile: {
      designation: "",
    },
  });

  const handleUserAdded = (newUser) => {
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
        const checkedInEmployees = response.data.filter(
          (employee) => employee.checkedInToday
        );
        const checkedOutEmployees = response.data.filter(
          (employee) => !employee.checkedInToday
        );

        setCheckedInCount(checkedInEmployees.length);
        setCheckedOutCount(checkedOutEmployees.length);
        setEmployeeCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  const handleMenuClick = (event, itemId) => {
    console.log("Item ID selected for editing:", itemId);
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);

    const selectedItem = data.find((item) => item.id === itemId);

    if (selectedItem) {
      setEditData({
        id: selectedItem.id,
        username: selectedItem.username,
        email: selectedItem.email,
        profile: {
          designation: selectedItem.designation,
        },
      });
      setEditusername(selectedItem.username);
      setEditemail(selectedItem.email);
      setEditdesignation(selectedItem.designation);
      setOpen(true);
    } else {
      console.error("Item not found for editing.");
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleEditClick = useCallback(
    (itemId) => () => {
      console.log("Edit clicked for item with ID:", itemId);
      setSelectedItemId(itemId);
      setOpen(true);
    },
    [handleMenuClose]
  );

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
      username: "",
      email: "",
      profile: {
        designation: "",
      },
    });
  };

  const handleEditApiCall = () => {
    const editData = {
      username: Editusername,
      email: Editemail,
      profile: {
        designation: Editdesignation,
      },
    };

    axios
      .put(
        `http://localhost:8080/bytesfarms/user/update?userId=${selectedItemId}`,
        editData
      )
      .then((response) => {
        console.log("Edit API response:", response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error editing item:", error.message);
      })
      .finally(() => {
        handleMenuClose();
        handleClose();
      });
  };

  return (
    <>
      <Sidebar />
      <main className="" style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-4">
          <h2 className=" pb-3">DASHBOARD</h2>

          <div className="d-flex">
            <div className=" col-md-3 ">
              <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                <img
                  src="/assets/dashboard/emp.png"
                  alt="emp"
                  className="mr-3"
                  style={{ width: "62px", height: "62px" }}
                />
                <div className="d-flex  row">
                  <span
                    className="d-block mb-2"
                    style={{
                      fontSize: "31px",
                      fontWeight: "700",
                      lineHeight: "28px",
                    }}
                  >
                    {employeeCount}
                  </span>
                  <p
                    className="mt-1 mb-3"
                    style={{ fontSize: "11px", fontWeight: "500" }}
                  >
                    Number of Employees
                  </p>
                </div>
              </div>
            </div>

            <div className=" col-md-3 ">
              <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                <img
                  src="/assets/dashboard/proj.png"
                  alt="emp"
                  className="mr-3"
                  style={{ width: "60px", height: "60px" }}
                />
                <div className="d-flex  row">
                  <span
                    className="d-block mb-2"
                    style={{
                      fontSize: "31px",
                      fontWeight: "700",
                      lineHeight: "28px",
                    }}
                  >
                    5
                  </span>
                  <p
                    className="mt-1 mb-2"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    Number of Project
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-md-3 ">
              <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                <img
                  src="/assets/dashboard/pre.png"
                  alt="emp"
                  className="mr-3"
                  style={{ width: "62px", height: "62px" }}
                />
                <div className="d-flex  row">
                  <span
                    className="d-block mb-2"
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      lineHeight: "28px",
                    }}
                  >
                    {checkedInCount}
                  </span>
                  <p
                    className="mt-1 mb-2"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    Present Today
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-md-3 ">
              <div
                className="d-flex   p-3  shadow shadow-lg rounded-4 "
                style={{ backgroundColor: "#1B1A47" }}
              >
                <img
                  src="/assets/dashboard/abs.png"
                  alt="emp"
                  className="mr-3"
                  style={{ width: "62px", height: "62px" }}
                />
                <div className="d-flex  row">
                  <span
                    className="d-block mb-2 text-white"
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      lineHeight: "28px",
                    }}
                  >
                    {checkedOutCount}
                  </span>
                  <p
                    className="mt-1 mb-2 text-white"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    Absent Today
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container pt-5">
            <div className="d-flex align-items-center search-container mb-3">
              {/* <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search " variant="outlined" value={searchTerm} onChange={handleSearch}/></Box> */}
              {/* <div className="d-flex align-items-center search-container">
  <input
    type="search"
    className="form-control rounded w-50"
    placeholder="Search"
    aria-label="Search"
    aria-describedby="search-addon"
    value={searchTerm}
    onChange={handleSearch}
  />
  <div className="search-icon-container">
    <img
      src="/assets/ic-search.png"
      alt="icon"
      className="search-icon"
    />
  </div>
</div> */}
              <input
                type="search"
                className="form-control rounded w-50"
                placeholder="Search by name"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-icon-container">
                <img
                  src="/assets/ic-search.png"
                  alt="icon"
                  className="search-icon"
                />
              </div>
            </div>
            <table
              class="table  "
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              }}
            >
              <thead class="table-secondary p-2">
                <tr>
                  <th className="text-center" scope="col">
                    S.No
                  </th>
                  <th scope="col">Name</th>

                  <th scope="col">Email Id</th>
                  <th>Designation</th>

                  <th className="text-right " style={{ width: "0px" }}>
                    <Add onUserAdded={handleUserAdded} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item?.id}>
                    <td className="text-center">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td>
                      <div class="d-flex align-items-center ">
                        <img
                          src={`data:image/png;base64, ${item && item.image}`}
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          class="rounded-circle mr-3"
                        />
                        {item && item.username}
                      </div>
                    </td>
                    <td>{item && item.email}</td>
                    <td>{item?.profile?.designation || "N/A"}</td>

                    {/* <td> {item && item.profile}</td> */}
                    <td className="text-right">
                      <IconButton
                        aria-haspopup="true"
                        onClick={(event) => handleMenuClick(event, item?.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleEditClick(item?.id)}>
                          Edit
                        </MenuItem>
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
                                  style={{ fontSize: "16px", color: "#666666" }}
                                  value={Editusername}
                                  onChange={handleusername}
                                />
                              </div>
                            </div>

                            <div className="">
                              <div
                                data-mdb-input-init
                                class="form-outline mb-4"
                              >
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
                                  style={{ fontSize: "16px", color: "#666666" }}
                                  value={Editemail}
                                  onChange={handleemail}
                                />
                              </div>
                            </div>

                            <div className="">
                              <div
                                data-mdb-input-init
                                class="form-outline mb-4"
                              >
                                <label
                                  class="form-label fw-bold text-secondary"
                                  for="form6Example1"
                                >
                                  {" "}
                                  Designation
                                </label>
                                <input
                                  type="email"
                                  id="form6Example5"
                                  class="form-control form-control-lg"
                                  placeholder="Designation"
                                  style={{ fontSize: "16px", color: "#666666" }}
                                  value={Editdesignation}
                                  onChange={handledesignation}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </DialogContent>
                      <DialogActions className="justify-content-start p-3">
                        <Button
                          className=" text-white w-25 p-2"
                          style={{ backgroundColor: "#1B1A47" }}
                          onClick={handleEditApiCall}
                        >
                          Update
                        </Button>
                        <Button
                          onClick={handleClose}
                          className="  w-25 p-2 fw-bold"
                          style={{
                            color: "#1B1A47",
                            backgroundColor: "#E7E7E7",
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={currentPage}
              onChange={paginate}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
