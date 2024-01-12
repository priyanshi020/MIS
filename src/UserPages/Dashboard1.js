import React, { useState, useEffect } from "react";
import Sidebar1 from "../components/Sidebar1";
import "./dashboard1.css";
import Calender from "./core/Calender";
import Timer from "./core/Timer";
import TaskList from "./core/TaskList";
import Chart from "./core/Chart";
import Meeting from "./core/Meeting";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
const Dashboard1 = () => {
  const [userName, setUserName] = useState("");
  const [imageProfile, setImageProfile] = useState("");
  const [designation, setDesignation] = useState("");
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    
    const userId = localStorage.getItem("userId");

    formData.append("userId", userId);
    formData.append("image", file);

    axios
      .post(
        `http://localhost:8080/bytesfarms/user/upload/Profile/image`,
        formData
      )
      .then(() => {
        // Image uploaded successfully, now fetch the updated user data
        axios
          .get(`http://localhost:8080/bytesfarms/user/getEmployees`)
          .then((response) => {
            const user = response.data.find(
              (employee) => employee.id.toString() === userId
            );

            if (user) {
              const newImageProfile = user.image;
              setImageProfile(newImageProfile);
            } else {
              console.error("User not found");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`http://localhost:8080/bytesfarms/user/getEmployees`)
        .then((response) => {
          // Assuming the response is an array of employees
          const user = response.data.find(
            (employee) => employee.id.toString() === userId
          );

          if (user) {
            setUserName(user.username); // Change from 'name' to 'username'
            setImageProfile(user.image);
            setDesignation(user.profile.designation);
          } else {
            console.error("User not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
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
              <div
                className="card mb-4 rounded-3 shadow shadow-lg "
                style={{ height: "384px" }}
              >
                <div className="card-body text-center mb-5">
                  {imageProfile && (
                    <div style={{ position: "relative" }}>
                      <img
                        src={`data:image/png;base64, ${imageProfile}`}
                        alt="avatar"
                        className="rounded-circle img-fluid mt-3"
                        style={{ width: "150px", height: "150px" }}
                      />
                      <label
                        htmlFor="imageUpload"
                        className="pencil-icon"
                        style={{
                          position: "absolute",
                          bottom: "0px",
                          right: "110px",
                          background: "rgb(211, 211, 211)",
                          padding: "4px",
                          height: "29px",
                          width: "29px",
                          borderRadius: "65%", // Border radius for a circular shape
                        }}
                      >
                        <FaPencilAlt style={{ height: "100%" }} />
                      </label>
                      <input
                        type="file"
                        id="imageUpload"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                  {/* <h5 className="my-3">{userName}</h5> */}
                  <h5 className="my-3 mt-5 " style={{ fontSize: "20px" }}>
                    {userName}
                  </h5>
                  <p
                    className="text-muted  text-lg"
                    style={{ fontSize: "20px" }}
                  >
                    {designation}
                  </p>
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
