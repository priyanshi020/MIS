import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import ApplyNow from "../components/ApplyNow";
import axios from "axios";

const FixedHeightCard = ({ children }) => (
  <Card style={{ padding: '20px', height: '350px', overflow: 'hidden' }}>
    {children}
  </Card>
);


const Recruitment1 = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/bytesfarms/recruitment/positions")
      .then((response) => {
        setPositions(response.data);
        const jobPositionId=response.data.id;
        localStorage.setItem('jobPositionId', jobPositionId.toString());
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  return (
    <div >
      <Sidebar1 />
      <main className="" style={{backgroundColor:'#F0F5FD'}} >
        <div className="p-5">
        <h3 className=" pb-3">Open Positions</h3>
        <div className="container">
          <div className="row  " >
            {positions.map((position) => (
              <div key={position.id} className="col-md-4 p-2 ">
                <FixedHeightCard >
                
                  <div className="d-flex flex-column grid gap-3  ">
                    <div
                      className="d-flex col-md-12 "
                      style={{ textAlign: "left" }}
                    >
                      <div className="d-flex flex-column justify-content-center col-md-12">
                       
                        <Typography
                          variant="body2"
                          color=""
                          style={{ fontSize: "18px", fontWeight: "bold" }}
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

                    <div className="d-flex justify-content-around col-md-9 grid gap-2" style={{marginLeft:'22px'}}>
                      <div className="col-md-4 p-0">
                        <Button
                          style={{
                            fontSize: "10px",
                            color: "black",
                            backgroundColor: "lightgray",
                            borderRadius: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Full Time
                        </Button>
                      </div>
                      <div className="col-md-4 p-0">
                        <Button
                          style={{
                            fontSize: "10px",
                            color: "black",
                            backgroundColor: "lightgray",
                            borderRadius: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          On-Site
                        </Button>
                      </div>
                      <div className="col-md-4 p-0">
                        <Button
                          style={{
                            fontSize: "10px",
                            color: "black",
                            backgroundColor: "lightgray",
                            borderRadius: "12px",
                            fontWeight: "bold",
                          }}
                        >
                        {position.experience}   years
                        </Button>
                      </div>
                    </div>
                    <div className="d-flex col-md-11 " style={{height:'120px',marginLeft:'19px'}}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ textAlign: "left", overflow: "hidden" }}
                      >{position.requirements}
                      
                      </Typography>
                    </div>
                    <div className="d-flex justify-content-between">
                   <div className="ml-2 mt-2">
                        <Button
                        variant="contained"
                        style={{
                          fontWeight: 'bold',
                          fontSize: "8px",
                          color: "black",
                          background: "#F0F5FD",
                          borderRadius: "30px",
                          marginTop: "10px",
                        }}
                      >
                        Number of Openings - {position.openings}
                      </Button>
                      </div>
                      <div>
                      {/* <Button
                        variant="contained"
                        style={{
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "white",
                          background: "#1B1A47",
                          borderRadius: "30px",
                          marginTop: "10px",
                        }}
                      >
                        Apply Now
                      </Button> */}
                      <ApplyNow jobPositionId={position.id}/>
                      </div>
                    </div>
                  </div>
                
                </FixedHeightCard>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="row g-1">
          {positions.map((position) => (
            <div className="col-md-4" key={position.id}>
              <div className="card m-2 shadow shadow-lg">
                <div className="row g-0">
                  <h3 className="pt-3 pb-3 text-center">{position.title}</h3>
                  <h6 className="text-center text-secondary pt-1">
                    No.of Openings: {position.openings}<br />
                  </h6>
                  <h6 className="text-center text-secondary pb-4">
                    Experience: {position.experience} Years
                  </h6>
                  <div className=''>
                    <h5 className='mx-5' >Requirements</h5>
                   <li className='mx-5' >{position.requirements}</li>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button
                      className="btn btn-dark btn-lg m-5 w-50"
                      type="submit"
                      style={{
                        transition: "background-color 0.3s",
                        backgroundColor: "#1B1A47",
                        color: "white",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.color = "#1B1A47";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#1B1A47";
                        e.target.style.color = "white";
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        </div>
      </main>
    </div>
  );
};

export default Recruitment1;
