import React, { useState } from 'react'
import Button from "@mui/material/Button";
import Sidebar from '../../components/Sidebar'
import { toast, ToastContainer } from "react-toastify";

const InterviewSchedule = () => {
    const [agenda,setAgenda]=useState("");
    const [topic,setTopic]=useState("");
    const [startDateTime,setStartDateTime]=useState("");
    const [organizer,setOrganizer]=useState("bytewisemis@gmail.com");
    const[listOfAttendee,setListOfAttendee]=useState("managerbytewise@gmail.com");
    const[resumePdf,setResumePdf]=useState(null);


    const handleSubmit = () => {
        if (!resumePdf) {
            console.error('No file selected');
            return;
          }
        
          // Check if the selected file is a PDF
          if (resumePdf.type !== 'application/pdf') {
            console.error('Invalid file type. Please select a PDF file.');
            return;
          }
    
        const formData = new FormData();
        formData.append("agenda", agenda);    
        // formData.append("userId", userId);
        
        formData.append("topic", topic);
        formData.append("startDateTime", startDateTime);
        formData.append("organizer", organizer);
        formData.append("listOfAttendee", listOfAttendee);
        
        const blob = new Blob([resumePdf], { type: resumePdf.type });
    
        formData.append("resumePdf", blob, resumePdf.name);
      
        const apiEndpoint = 'http://localhost:8080/bytesfarms/scheduleMeet/zoom';
      
        fetch(apiEndpoint, {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(result => {
          // Handle the API response if needed
          console.log('API Response:', result);
          toast.success("Successfully Scheduled the Meeting");
        setAgenda("");
      setTopic("");
      setStartDateTime("");
      setListOfAttendee("");
      setResumePdf(null);
        })
        .catch(error => {
          console.error('Error:', error);
        //   toast.success("Successully Applied for a job");
        });
      
       
       
      };
  return (
   <>
    <Sidebar/>
    <main style={{backgroundColor:"#F0F5FD"}}>
    <div className='p-4'>
        <ToastContainer/>
    <h3 className='pb-3'>Schedule Interview</h3>
    <form>
            {/* Name and Email Fields */}
            <div className="row">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                    Agenda
                  </label>
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control form-control-lg"
                    placeholder="Agenda"
                    style={{ fontSize: "16px", color: "#666666" }}
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                    // disabled
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                    Topic
                  </label>
                  <input
                    type="text"
                    id="form6Example5"
                    className="form-control form-control-lg"
                    placeholder="Topic"
                    style={{ fontSize: "16px", color: "#666666" }}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    // disabled
                  />
                </div>
              </div>
            </div>

            {/* Work Experience Fields */}
            {/* <h5 className="mb-3">Work Experience</h5> */}
            <div className="row">
              {/* Job Title */}
              <div className="col-mb-4">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                    Meeting Time
                  </label>
                  <input
                    type="text"
                    id="form6Example5"
                    className="form-control form-control-lg"
                    placeholder="Meeting Time"
                    style={{ fontSize: "16px", color: "#666666" }}
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="col-mb-4">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                    Organizer
                  </label>
                  <input
                    type="email"
                    id="form6Example6"
                    className="form-control form-control-lg"
                    placeholder="Organizer"
                    style={{ fontSize: "16px", color: "#666666" }}
                    // value={organizer}
                    // onChange={(e) => setOrganizer(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Experience and Expected Salary Fields */}
            <div className="row">
              {/* Experience */}
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label fw-bold text-secondary" htmlFor="form6Example1">
                  List of Attendee
                </label>
                <input
                  type="text"
                  id="form6Example5"
                  className="form-control form-control-lg"
                  placeholder="List of Attendee"
                  style={{ fontSize: "16px", color: "#666666" }}
                //   value={listOfAttendee}
                //   onChange={(e) => setListOfAttendee(e.target.value)}
                />
              </div>

             
            </div>

            {/* File Upload */}
            <div className="input-group mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={(e) => setResumePdf(e.target.files[0])}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  {resumePdf ? resumePdf.name : "Choose file"}
                </label>
              </div>
            </div>
          </form>
          <div className=''>
          <Button
            className="text-white w-25 p-2 mr-2"
            style={{ backgroundColor: "#1B1A47" }}
            onClick={handleSubmit}
          >
            Schedule the Interview
          </Button>

         
          
          </div>
    </div>
    </main>
   </>
  )
}

export default InterviewSchedule