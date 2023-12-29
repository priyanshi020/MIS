import React, { useState, useEffect } from 'react';
import Sidebar1 from '../components/Sidebar1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

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
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  return (
    <>
      <Sidebar1 />
      <main className='m-5'>
        <h3>Open Positions</h3>
        <div className="row g-1">
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
        </div>
      </main>
    </>
  );
}

export default Recruitment1;
