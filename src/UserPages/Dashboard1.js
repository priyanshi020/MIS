import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import "./dashboard1.css";
import Calender from "./core/Calender";
import Timer from "./core/Timer";
import TaskList from "./core/TaskList";
import Chart from "./core/Chart";
import Meeting from "./core/Meeting";
const Dashboard1 = () => {
  return (
    <>
      <Sidebar1 />
      <main style={{ marginLeft: "30px", backgroundColor: "#F4F7Fc" }}>
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

          <div className="col col-md-8">
            <Chart />
             
          </div>

          <div className="col col-md-6">{/* <Meeting/> */}</div>
        </div>{" "}
      </main>
    </>
  );
  
};

export default Dashboard1;
