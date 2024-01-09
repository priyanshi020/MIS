import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { saveAs } from "file-saver";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const PdfViewer = ({ jobId }) => {
  const [open, setOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/bytesfarms/resume/get?jobPositionId=${jobId}`
        );
        const data = await response.json();

        // Assuming your API response looks something like this:
        // { id: 1, user: { username: 'John', email: 'john@example.com' }, fileData: '...' }
        // Extracting resumeId and adding it to the application object
        const applicationsWithResumeId = data.map((application) => ({
          ...application,
          resumeId: application.id, // Replace 'id' with the actual property from your API response
        }));

        setApplications(applicationsWithResumeId);
      } catch (error) {
        console.error("Error fetching application data", error);
      }
    };

    fetchData();
  }, [jobId]);

  const downloadPdf = (pdfData, candidateUsername) => {
    const sanitizedUsername = candidateUsername.replace(/[^a-z0-9]/gi, "_");
    const filename = `${sanitizedUsername}_resume.pdf`;
  
    const byteCharacters = atob(pdfData);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    saveAs(blob, filename);
  };
  

  const handleMenuClick = (event, application) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplication(application);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApplication(null);
  };

  const handleStatusUpdate = (status) => {
    if (selectedApplication) {
      // Make API call to update status
      const { resumeId } = selectedApplication;
      const updateStatusApi = `http://localhost:8080/bytesfarms/resume/update-status?resumeId=${resumeId}&jobPositionId=${jobId}`;

      axios.put(updateStatusApi, status, {
        headers: {
          'Content-Type': 'text/plain', // Set the content type to text/plain if needed
        },
      })
        .then(response => {
          // Handle success
          console.log(`Application status updated to ${status}`);
        })
        .catch(error => {
          // Handle error
          console.error("Error updating application status:", error);
        })
        .finally(() => {
          handleMenuClose();
        });
      
    }
  };


  return (
    <>
      <div className="container">
        <button
          variant="outlined"
          onClick={handleClickOpen}
          id="addbutton"
          className="btn btn-primary btn-sm-3 rounded-3 "
          style={{ backgroundColor: "#1B1A47", color: "white" }}
          type="button"
          title="View Application"
        >
          View Application
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          className="p-5"
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle style={{ fontSize: "25px", fontWeight: "600" }}>
            Job Applications
          </DialogTitle>
          <DialogContent>
            <div className="table-responsive">
              <table
                className="rounded-4 table table-striped"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
                }}
              >
                <thead className="table-secondary text-center">
                  <tr>
                    <th style={{padding:'20px'}}>S.No</th>
                    <th style={{ padding: "20px" }}>Candidate Name</th>
                    <th style={{ padding: "20px" }}>Email </th>
                    <th style={{ padding: "20px" }}>Resume </th>
                    <th></th>
                  </tr>
                </thead>

                {applications ? (
                  <tbody className="text-center">
                    {applications.map((application,index) => (
                      <tr key={application.id}>
                        <td>{index+1}</td>
                        <td className="text-center">
                          {application.user.username}
                        </td>
                        <td>{application.user.email}</td>

                        <td>
                          {application.fileData && (
                            <Button
                            onClick={() => downloadPdf(application.fileData, application.user.username)}
                              className="text-white"
                              style={{ backgroundColor: "#1B1A47" }}
                            ><img src='/assets/Download.png' alt='icon' className="mr-2"/>
                              Download
                            </Button>
                          )}
                        </td>
                        <td className="text-right">
                            <IconButton 
                            aria-haspopup='true'
                            onClick={(event) => handleMenuClick(event, application)}
                            >
                              <MoreVertIcon/>
                            </IconButton>
                            <Menu 
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}>
                              <MenuItem onClick={() => handleStatusUpdate("SHORTLISTED")}>Shortlisted</MenuItem>
                              <MenuItem onClick={() => handleStatusUpdate("REJECTED")}>Rejected</MenuItem>
                            </Menu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tr>
                    <td colSpan="8">Loading...</td>
                  </tr>
                )}
              </table>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className="text-white"
              style={{ backgroundColor: "#1B1A47" }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
     
    </>
  );
};

export default PdfViewer;
