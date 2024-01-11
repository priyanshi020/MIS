import React, { useState ,useEffect} from 'react'
import Sidebar1 from '../components/Sidebar1'
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from 'axios';
const TimeTracker = () => {
  const[data,setData]=useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleMenuClick=(event)=>{
    setAnchorEl(event.currentTarget);
  }
  const handleMenuClose=()=>{
    setAnchorEl(null);
  }
  const handleClose=()=>{
    setOpen(false);
  }
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
  return (
    <>
    <Sidebar1/>
    <main style={{ backgroundColor: "#F0F5FD" }}> 
    <div className='p-5'>
      <h3 className='pb-3'>TIME TRACKER</h3>
      <table
                className="table "
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                }}
              >
                <thead className="table-secondary p-2">
                  <tr>
                    <th
                      scope="col"
                      className="text-center "
                      style={{ padding: "20px" }}
                    >
                      S.No
                    </th>
                    <th scope="col" className="" style={{ padding: "20px" }}>
                      Title
                    </th>
                    <th scope="col" style={{ padding: "20px" }}>
                      Openings
                    </th>
                    <th scope="col" style={{ padding: "20px" }}>
                      {" "}
                      Experience
                    </th>
                    <th scope="col" style={{ padding: "20px" }}>
                      Requirements
                    </th>
                    <th>
                      {/* <AddJob onJobAdded={handleJobAdded} /> */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {data.map((item, index) => ( */}
                    {/* <tr key={item.id}> */}
                    <tr>
                      <td className="text-center"></td>
                      {/* <td>{item.title}</td>
                      <td>{item.openings}</td>
                      <td>{item.experience}</td>
                      <td>{item.requirements}</td> */}
                      <td>
                        <IconButton
                          aria-haspopup="true"
                          onClick={(event) => handleMenuClick(event)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem>
                            Edit
                          </MenuItem>
                          <MenuItem >
                            Delete
                          </MenuItem>
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
                            // value={Edittitle}
                            // onChange={handletitle}
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
                            // value={Editopening}
                            // onChange={handleopening}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="number"
                            label="Experience"
                            type="number"
                            fullWidth
                            variant="standard"
                            // value={Editexperience}
                            // onChange={handleexperience}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="number"
                            label="Requirement"
                            type="text"
                            fullWidth
                            variant="standard"
                            // value={Editreq}
                            // onChange={handleReq}
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
                            // onClick={handleEditApiCall}
                          >
                            Edit
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </tr>
                  {/* ))} */}
                </tbody>
              </table>
    </div>
    </main>
    </>
  )
}

export default TimeTracker