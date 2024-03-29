import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
const Profile = () => {
  const [userName, setUserName] = useState("");
  const [imageProfile, setImageProfile] = useState("");
  const [designation, setDesignation] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState(" ");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      fullName,
      email,
      phone,
      mobile,
      address,
      department,
      location,
      designation,
      experience,
      joiningDate,
    };

    // Assuming you have the user ID available
    const userId = localStorage.getItem("userId");

    axios
      .put(
        `http://localhost:8080/bytesfarms/user/updateUserData/${userId}`,
        updatedData
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

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
      <Sidebar />
      <main className="" style={{ backgroundColor: "#F0F5FD" }}>
        <section className="p-5">
          <div class="container ">
            <div class="row">
              <div class="col-lg-4">
                <div
                  className="card mb-4 rounded-3 shadow shadow-lg "
                  style={{ height: "384px" }}
                >
                  <div className="card-body text-center mb-2">
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

                <div class="bg-white card rounded-4 shadow shadow-lg p-3 position-relative">
                  {editMode && (
                    <button
                      className="btn btn-primary position-absolute top-0 end-0 m-3"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  )}
                  <div class="row">
                    <div class="col-sm-9">
                      <h5 class="py-4">Work Information</h5>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-5">
                      <p class="mb-2">Department</p>
                    </div>
                    <div class="col-sm-7">
                      {editMode ? (
                        <input
                          type="text"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{department}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-5">
                      <p class="mb-2">Location</p>
                    </div>
                    <div class="col-sm-7">
                      {editMode ? (
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{location}</p>
                      )}{" "}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-5">
                      <p class="mb-2">Designation</p>
                    </div>
                    <div class="col-sm-7">
                      {editMode ? (
                        <input
                          type="text"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{designation}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-5">
                      <p class="mb-2"> Experience</p>
                    </div>
                    <div class="col-sm-7">
                      {editMode ? (
                        <input
                          type="text"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{experience}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-5">
                      <p class="mb-2"> Joining Date</p>
                    </div>
                    <div class="col-sm-7">
                      {editMode ? (
                        <input
                          type="text"
                          value={joiningDate}
                          onChange={(e) => setJoiningDate(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{joiningDate}</p>
                      )}
                    </div>
                  </div>
                  {!editMode && (
                    <button
                      className="btn btn-link position-absolute top-0 end-0 m-3"
                      onClick={handleEditClick}
                    >
                      <FaPencilAlt />
                    </button>
                  )}
                </div>
              </div>

              <div class="col-lg-8">
                <div className="bg-white card rounded-4 shadow shadow-lg p-3 position-relative">
                  {editMode && (
                    <button
                      className="btn btn-primary position-absolute top-0 end-0 m-3"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  )}
                  <div className="row">
                    <div className="col-sm-9">
                      <h5 className="py-4">Basic Information</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-4">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      {editMode ? (
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{fullName}</p>
                      )}
                    </div>
                    <div className="col-sm-3">
                      <p className="mb-4">Email</p>
                    </div>
                    <div className="col-sm-9">
                      {editMode ? (
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{email}</p>
                      )}
                    </div>
                    <div className="col-sm-3">
                      <p className="mb-4">Phone </p>
                    </div>
                    <div className="col-sm-9">
                      {editMode ? (
                        <input
                          type="number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{phone}</p>
                      )}
                    </div>
                    <div className="col-sm-3">
                      <p className="mb-4">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      {editMode ? (
                        <input
                          type="number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{mobile}</p>
                      )}
                    </div>
                    <div className="col-sm-3">
                      <p className="mb-5">Address</p>
                    </div>
                    <div className="col-sm-9">
                      {editMode ? (
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <p className="text-muted mb-0">{address}</p>
                      )}
                    </div>
                  </div>
                  {/* Repeat similar structure for other fields */}
                  {!editMode && (
                    <button
                      className="btn btn-link position-absolute top-0 end-0 m-3"
                      onClick={handleEditClick}
                    >
                      <FaPencilAlt />
                    </button>
                  )}
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class=" mb-4 mt-4">
                      <div class="card-body bg-white shadow shadow-lg p-3">
                        <div class="row">
                          <div class="col-sm-9">
                            <h5 class="mb-3">Personal Information</h5>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-3">
                            <p class="mb-0">DOB</p>
                          </div>
                          <div class="col-sm-9">
                            <p class="text-muted mb-0">Johnatan Smith</p>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <p class="mb-0">Age</p>
                          </div>
                          <div class="col-sm-9">
                            <p class="text-muted mb-0">example@example.com</p>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <p class="mb-0">Gender</p>
                          </div>
                          <div class="col-sm-9">
                            <p class="text-muted mb-0">(097) 234-5678</p>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <p class="mb-0">Marital Status</p>
                          </div>
                          <div class="col-sm-9">
                            <p class="text-muted mb-0">(098) 765-4321</p>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <p class="mb-0">Address</p>
                          </div>
                          <div class="col-sm-9">
                            <p class="text-muted mb-0">
                              Bay Area, San Francisco, CA
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
