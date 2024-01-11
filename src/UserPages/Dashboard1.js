import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import "./dashboard1.css";
import Calender from "./core/Calender";
import Timer from "./core/Timer";
import TaskList from "./core/TaskList";
import Chart from "./core/Chart";
import Meeting from "./core/Meeting";
import axios from "axios";

const Dashboard1 = () => {
  const [userName, setUserName] = useState('');
  const[imageProfile,setImageProfile]=useState('')
  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios.get(`http://localhost:8080/bytesfarms/user/getEmployees`)
        .then(response => {
          // Assuming the response is an array of employees
          const user = response.data.find(employee => employee.id.toString() === userId);

          if (user) {
            setUserName(user.username);  // Change from 'name' to 'username'
            setImageProfile(user.image);
          } else {
            console.error('User not found');
          }
        })
        .catch(error => {
          console.error('Error fetching user data', error);
        });
    }
  }, []);

  return (
    <>
      <Sidebar1 />
      <main style={{ backgroundColor: "#F0F5FD" }}> 
      <div className="p-5">
        <h3 className="pb-3">DASHBOARD</h3>
        
        {/* Timer Card */}
        <div className="row row-cols-2 g-3">
          <div className="col col-md-4">
            <Timer />
          </div>

          



          {/* Calender  card */}
          <div className="col col-md-4">
            <Calender />
          </div>

          {/* User Profile Card */}
          <div className="col col-md-4">
            <div className="card mb-4 rounded-3 shadow shadow-lg " style={{height:'384px'}}>
              <div className="card-body text-center mb-5">
              {imageProfile && (
              <img
                src={`data:image/png;base64, ${imageProfile}`}  // Use 'imageProfile' directly
                alt="avatar"
                className="rounded-circle img-fluid mt-3"
                style={{ width: "150px",height :'150px' }}
              />
            )}
                {/* <h5 className="my-3">{userName}</h5> */}
                <h5 className="my-3 mt-5 " style={{fontSize:'20px'}} >{userName}</h5>
                <p className="text-muted  text-lg" style={{fontSize:'20px'}}>Full Stack Developer</p>
              </div>
            </div>
          </div>

          {/* Tasklist */}
          <div className="col col-md-4">
            <TaskList />
          </div>

          {/* Meeting */}
          <div className="col col-md-6">
            <Meeting />
          </div>
        </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard1;
