import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { saveAs } from "file-saver";

const PdfViewer = ({ jobId }) => {
  const [open, setOpen] = useState(false);
  const [applications, setApplications] = useState([]);

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
        setApplications(data);
      } catch (error) {
        console.error("Error fetching application data", error);
      }
    };

    fetchData();
  }, [jobId]);

  const downloadPdf = (pdfData) => {
    const byteCharacters = atob(pdfData);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    saveAs(blob, "resume.pdf");
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
                    <th style={{ padding: "20px" }}>Candidate Name</th>
                    <th style={{ padding: "20px" }}>Email </th>
                    <th style={{ padding: "20px" }}>Resume </th>
                  </tr>
                </thead>

                {applications ? (
                  <tbody className="text-center">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="text-center">
                          {application.user.username}
                        </td>
                        <td>{application.user.email}</td>

                        <td>
                          {application.fileData && (
                            <Button
                              onClick={() => downloadPdf(application.fileData)}
                              className="text-white"
                              style={{ backgroundColor: "#1B1A47" }}
                            ><img src='/assets/Download.png' alt='icon' className="mr-2"/>
                              Download
                            </Button>
                          )}
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
      {/* {applications.map((application) => (
        <div key={application.id}>
          <h2>Job Position: {application.jobPosition.title}</h2>
          <p>User: {application.user.username}</p>
          <p>Email: {application.user.email}</p>

          {application.fileData && (
            <button onClick={() => downloadPdf(application.fileData)}>
              Download PDF
            </button>
          )}
        </div>
      ))} */}
    </>
  );
};

export default PdfViewer;
