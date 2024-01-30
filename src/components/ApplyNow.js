import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast, ToastContainer } from "react-toastify";
import { SettingsPhone } from "@mui/icons-material";

function ApplyNow({jobPositionId}) {
  const [open, setOpen] = React.useState(false);
  const storedUserId = localStorage.getItem('userId');
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;
  const storedUserName = localStorage.getItem('username');
  const storedUserEmail = localStorage.getItem('email');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [username, setUsername] = useState(storedUserName || "");
  const [email, setEmail] = useState(storedUserEmail || "");
  const [lastJobTitle, setLastJobTitle] = useState("");
  const [lastJobCompany, setLastJobCompany] = useState("");
  const [lastJobExperience, setLastJobExperience] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    setUsername(storedUserName || "");
    setEmail(storedUserEmail || "");
  }, [storedUserName, storedUserEmail]);  

  const handleSubmit = () => {
    if (!file) {
        console.error('No file selected');
        return;
      }
    
      // Check if the selected file is a PDF
      if (file.type !== 'application/pdf') {
        console.error('Invalid file type. Please select a PDF file.');
        return;
      }

    const formData = new FormData();
    formData.append("jobPositionId", jobPositionId);    
    formData.append("userId", userId);
    
    formData.append("lastJobTitle", lastJobTitle);
    formData.append("lastJobCompany", lastJobCompany);
    formData.append("lastJobExperience", lastJobExperience);
    formData.append("expectedSalary", expectedSalary);
    
    const blob = new Blob([file], { type: file.type });

    // Append the file to the FormData
    formData.append("file", blob, file.name);
  
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    const apiEndpoint = 'http://localhost:8080/bytesfarms/resume/upload';
  
    fetch(apiEndpoint, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(result => {
      // Handle the API response if needed
      console.log('API Response:', result);
      toast.success("Successfully Applied for a job");
    })
    .catch(error => {
      console.error('Error:', error);
      toast.success("Successully Applied for a job");
    });
  
    // Close the dialog after submission
    setOpen(false);
  };
  
  return (
    <div className="container">
       <ToastContainer />
      {/* Apply Now Button */}
      <Button
        variant="contained"
        style={{
          fontWeight: 600,
          fontSize: "15px",
          color: "white",
          background: "#1B1A47",
          borderRadius: "30px",
          marginTop: "10px",
        }}
        component="span"
        onClick={handleClickOpen}
      >
        Apply Now
      </Button>

      {/* Application Dialog */}
      <Dialog open={open} onClose={handleClose} className="p-5">
        <DialogTitle className="text-center" style={{ fontSize: "30px", fontWeight: "600" }}>
          Apply Now
        </DialogTitle>
        <DialogContent>
          {/* Form */}
          <form>
            {/* Name and Email Fields */}
            <div className="row">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                    NAME<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    style={{ fontSize: "16px", color: "#666666" }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    // disabled
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                    EMAIL<span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="form6Example5"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    style={{ fontSize: "16px", color: "#666666" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    // disabled
                  />
                </div>
              </div>
            </div>

            {/* Work Experience Fields */}
            <h5 className="mb-3">Work Experience</h5>
            <div className="row">
              {/* Job Title */}
              <div className="col-mb-4">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                    JOB TITLE
                  </label>
                  <input
                    type="text"
                    id="form6Example5"
                    className="form-control form-control-lg"
                    placeholder="Job Title"
                    style={{ fontSize: "16px", color: "#666666" }}
                    value={lastJobTitle}
                    onChange={(e) => setLastJobTitle(e.target.value)}

                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="col-mb-4">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                    COMPANY NAME
                  </label>
                  <input
                    type="text"
                    id="form6Example6"
                    className="form-control form-control-lg"
                    placeholder="Company Name"
                    style={{ fontSize: "16px", color: "#666666" }}
                    value={lastJobCompany}
                    onChange={(e) => setLastJobCompany(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Experience and Expected Salary Fields */}
            <div className="row">
              {/* Experience */}
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                  EXPERIENCE
                </label>
                <input
                  type="number"
                  id="form6Example5"
                  className="form-control form-control-lg"
                  placeholder="Experience"
                  style={{ fontSize: "16px", color: "#666666" }}
                  value={lastJobExperience}
                  onChange={(e) => setLastJobExperience(e.target.value)}
                />
              </div>

              {/* Expected Salary */}
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                  EXPECTED SALARY
                </label>
                <input
                  type="number"
                  id="form6Example6"
                  className="form-control form-control-lg"
                  placeholder="Expected Salary"
                  style={{ fontSize: "16px", color: "#666666" }}
                  value={expectedSalary}
                  onChange={(e) => setExpectedSalary(e.target.value)}
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="input-group mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload<span style={{ color: 'red' }}>*</span>
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {file ? file.name : "Choose file"}
                </label>
              </div>
            </div>
          </form>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions className="justify-content-start p-3">
          {/* Apply Button */}
          <Button
            className="text-white w-25 p-2"
            style={{ backgroundColor: "#1B1A47" }}
            onClick={handleSubmit}
          >
            Apply
          </Button>

          {/* Cancel Button */}
          <Button
            onClick={handleClose}
            className="w-25 p-2 fw-bold"
            style={{ color: "#1B1A47", backgroundColor: "#E7E7E7" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ApplyNow;
