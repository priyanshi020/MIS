import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import "./dashboard1.css";
import Calender from "./core/Calender";
import Timer from "./core/Timer";
import TaskList from "./core/TaskList";
import Chart from "./core/Chart";
import Meeting from "./core/Meeting";
const Dashboard1 = () => {
  const storedUserId = localStorage.getItem('userId');
const userId = storedUserId ? parseInt(storedUserId, 10) : null;
  return (
    <>
      <Sidebar1 />
      <main style={{ marginLeft: "30px", backgroundColor: "#F0F5FD" }}> 
        <h3 className="m-3 pt-3 pb-3">DASHBOARD</h3>
        {/* Timer Card */}
        <div class="row row-cols-2 g-3">
          <div class="col col-md-4">
            <Timer />
          </div>

          {/* Calender  card */}
          <div class="col col-md-4">
            <Calender />
          </div>

          {/* tasklist */}
          <div className="col col-md-4">
            <TaskList />
          </div>

          <div className="col col-md-4">
            {/* <Chart /> */}
            <div class="card mb-4 shadow shadow-lg ">
          <div class="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              class="rounded-circle img-fluid" style={{width: "150px"}}/>
            <h5 class="my-3">John SMith</h5>
            <p class="text-muted mb-1">Full Stack Developer</p>
            {/* <p class="text-muted mb-4">bytesfarms</p> */}
           
          </div>
        </div>
          </div>

          <div className="col col-md-6">{/* <Meeting/> */}</div>
        </div>{" "}
      </main>
    </>
  );
  
};

export default Dashboard1;
