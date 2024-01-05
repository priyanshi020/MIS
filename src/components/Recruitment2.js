import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import { Button, Card, Typography } from '@mui/material';
import axios from "axios";
import ApplyNow from "./ApplyNow";

const Recruitment2 = () => {
  const [positions, setPositions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/bytesfarms/recruitment/positions")
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  const handleFileChange = (e) => {
    // Handle the selected file
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleApplyNowClick = (positionId) => {
    // Implement your logic to submit the application with the selected file
    if (selectedFile) {
      const formData = new FormData();
      formData.append("positionId", positionId);
      formData.append("resume", selectedFile);

      // Add your API call or form submission logic here
      // Example: axios.post("your_api_endpoint", formData)
       axios.post("http://localhost:8080/bytesfarms/resume/upload", formData);
      console.log("Position ID:", positionId);
      console.log("Selected File:", selectedFile);
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <>
     
      <div className="m-5">
        <h3>Open Positions</h3>
        <div className="container">
          <div className="row rounded-4">
            {positions.map((position) => (
              <div key={position.id} className="col-md-4 p-2">
                <Card style={{ padding: "20px" }}>
                  <div className="d-flex flex-column grid gap-3">
                    <div
                      className="d-flex col-md-12 "
                      style={{ textAlign: "left" }}
                    >
                      <div className="d-flex flex-column justify-content-center col-md-8">
                        <Typography
                          gutterBottom
                          variant="body2"
                          style={{ fontSize: "15px", color: "gray" }}
                        ></Typography>
                        <Typography
                          variant="body2"
                          color=""
                          style={{ fontSize: "20px", fontWeight: "bold" }}
                        >
                          {position.title}
                        </Typography>
                        <div className="d-flex">
                          <img src='/assets/Frame.png' alt='icon'/>
                          <Typography variant="body2" color="text.secondary">
                            Indore, INDIA
                          </Typography>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex col-md-12 grid gap-4">
                      <div className="col-md-2">
                        <Button
                          style={{
                            fontSize: "9px",
                            color: "black",
                            backgroundColor: "lightgray",
                            borderRadius: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Full Time
                        </Button>
                      </div>
                      <div className="col-md-2">
                        <Button
                          style={{
                            fontSize: "9px",
                            color: "black",
                            backgroundColor: "lightgray",
                            borderRadius: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          On-Site
                        </Button>
                      </div>
                      <div className="col-md-2">
                        <Button
                          style={{
                            fontSize: "9px",
                            color: "black",
                            backgroundColor: "lightgray",
                            borderRadius: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {position.experience} years
                        </Button>
                      </div>
                    </div>
                    <div className="d-flex col-md-11">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ textAlign: "left" }}
                      >
                        {position.requirements}
                      </Typography>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="contained"
                        style={{
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "black",
                          background: "lightgray",
                          borderRadius: "30px",
                          marginTop: "10px",
                        }}
                      >
                        Number of Openings - {position.openings}
                      </Button>
                      {/* <div>
                        <input
                          type="file"
                          accept=".pdf"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          id={`fileInput-${position.id}`}
                        />
                        <label htmlFor={`fileInput-${position.id}`}>
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
                            onClick={() => handleApplyNowClick(position.id)}
                          >
                            Apply Now
                          </Button>
                        </label>
                      </div> */}
                      <ApplyNow jobPositionId={position.id}/>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recruitment2;
