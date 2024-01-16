import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import AddPolicy from "./core/AddPolicy";
const CompanyPolicy1 = () => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const maxLinesToShow = 3;
  const [Edittitle, setEdittitle] = useState("");
  const handletitle = (e) => {
    setEdittitle(e.target.value);
  };

  const [EditContent, setEditcontent] = useState("");
  const handleContent = (e) => {
    setEditcontent(e.target.value);
  };

  const [editData, setEditData] = useState({
    id: null,
    title: "",
    content: "",
  });

  const handlePolicyAdded = (newPolicy) => {
    setData((prevData) => [...prevData, newPolicy]);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/bytesfarms/policy/get?id=0")
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
        content: selectedItem.content,
      });

      setEdittitle(selectedItem.title);
      setEditcontent(selectedItem.content);

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

  const handleDeleteClick = () => {
    if (!selectedItemId) {
      console.error("No item selected for deletion.");
      handleMenuClose();
      return;
    }

    const apiUrl = `http://localhost:8080/bytesfarms/policy/delete?id=${selectedItemId}`;

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
      content: "",
    });
  };

  const handleEditApiCall = () => {
    const editData = {
      title: Edittitle,
      content: EditContent,
    };

    axios
      .put(
        `http://localhost:8080/bytesfarms/policy/update?id=${selectedItemId}`,
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
      <main style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-4">
          <h3 className=" pb-3">Company Policy</h3>
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
                  Content
                </th>

                <th>
                  <AddPolicy onPolicyAdded={handlePolicyAdded} />
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    <div
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: showFullContent
                          ? "unset"
                          : maxLinesToShow,
                      }}
                    >
                      {item.content}
                    </div>
                    {!showFullContent && (
                      <span
                        style={{ color: "#007BFF", cursor: "pointer" }}
                        onClick={() => setShowFullContent(true)}
                      >
                        See more
                      </span>
                    )}
                    {showFullContent && (
                      <span
                        style={{ color: "#007BFF", cursor: "pointer" }}
                        onClick={() => setShowFullContent(false)}
                      >
                        See less
                      </span>
                    )}
                  </td>

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
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="lg"
                  >
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
                        label="Content"
                        multiline
                        rows={8} // Set the number of rows based on your content length
                        fullWidth
                        variant="standard"
                        name="name"
                        value={EditContent}
                        onChange={handleContent}
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
                        className=" text-white"
                        style={{ backgroundColor: "#1B1A47" }}
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
        </div>
      </main>
    </>
  );
};

export default CompanyPolicy1;
