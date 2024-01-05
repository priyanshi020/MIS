import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddJob from "./core/AddJob";
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


const Recruitment = () => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [Edittitle, setEdittitle] = useState("");
  const handletitle = (e) => {
    setEdittitle(e.target.value);
  };

  const [Editreq, setEditreq] = useState("");
  const handleReq = (e) => {
    setEditreq(e.target.value);
  };

  const [Editopening, setEditopening] = useState("");
  const handleopening = (e) => {
    setEditopening(e.target.value);
  };

  const [Editexperience, setEditexperience] = useState("");
  const handleexperience = (e) => {
    setEditexperience(e.target.value);
  };

  const [editData, setEditData] = useState({
    id: null,
    title: "",
    openings: 0,
    experience: 0,
    requirements: "",
  });

  const handleJobAdded = (newJob) => {
    setData((prevData) => [...prevData, newJob]);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/bytesfarms/recruitment/positions")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  const handleMenuClick = (event, itemId) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);

    const selectedItem = data.find((item) => item.id === itemId);

    if (selectedItem) {
      setEditData({
        id: selectedItem.id,
        title: selectedItem.title,
        openings: selectedItem.openings,
        experience: selectedItem.experience,
        requirements: selectedItem.requirements,
      });

      setEdittitle(selectedItem.title);
      setEditopening(selectedItem.openings);
      setEditexperience(selectedItem.experience);
      setEditreq(selectedItem.requirements);

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
      setSelectedItemId(itemId);
      setOpen(true);
    },
    [handleMenuClose]
  );

  const handleid = (item) => {
    setSelectedItemId(item);
  };

  const handleDeleteClick = () => {
    if (!selectedItemId) {
      console.error("No item selected for deletion.");
      handleMenuClose();
      return;
    }

    const apiUrl = `http://localhost:8080/bytesfarms/recruitment/positions/delete?id=${selectedItemId}`;

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
      title: "",
      openings: 0,
      experience: 0,
      requirements: "",
    });
  };

  const handleEditApiCall = () => {
    const editData = {
      title: Edittitle,
      openings: Editopening,
      experience: Editexperience,
      requirements: Editreq,
    };

    axios
      .put(
        `http://localhost:8080/bytesfarms/recruitment/positions/update?id=${selectedItemId}`,
        editData
      )
      .then((response) => {
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Sidebar />

      <main className="" style={{ backgroundColor: "#F0F5FD" }}>
        <div className="m-5">
        <h3>Recruitment</h3>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example  "
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "orange",
                },
                "& .MuiTab-root": {
                  color: "black !important",
                  "&:hover": {
                    color: "orange",
                  },
                },
              }}
            >
              <Tab label="Open Positions" {...a11yProps(0)} />
              <Tab label="Candidate" {...a11yProps(1)} />
              {/* <Tab label='GUEST' {...a11yProps(2)}/> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <table className="table " style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px'}}>
              <thead className="table-secondary">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Title</th>
                  <th scope="col">Openings</th>
                  <th scope="col"> Experience</th>
                  <th scope="col">Requirements</th>
                  <th>
                    <AddJob onJobAdded={handleJobAdded} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.openings}</td>
                    <td>{item.experience}</td>
                    <td>{item.requirements}</td>
                    <td>
                      <IconButton
                        aria-haspopup="true"
                        onClick={(event) => handleMenuClick(event, item.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleEditClick(item.id)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                      </Menu>
                    </td>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle
                        style={{ fontSize: "30px", fontWeight: "600" }}
                      >
                        Update
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
                          name="name"
                          value={Edittitle}
                          onChange={handletitle}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="number"
                          label="Openings"
                          type="number"
                          fullWidth
                          variant="standard"
                          name="name"
                          value={Editopening}
                          onChange={handleopening}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="number"
                          label="Experience"
                          type="number"
                          fullWidth
                          variant="standard"
                          value={Editexperience}
                          onChange={handleexperience}
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="number"
                          label="Requirement"
                          type="text"
                          fullWidth
                          variant="standard"
                          value={Editreq}
                          onChange={handleReq}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClose}
                          className="bg-dark text-white"
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-dark text-white"
                          onClick={handleEditApiCall}
                        >
                          Edit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </tr>
                ))}
              </tbody>
            </table>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>

          </CustomTabPanel>
        </Box></div>
      </main>
    </>
  );
};

export default Recruitment;
