import React,{useState,useEffect} from "react";
import axios from "axios";
import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTachometerAlt,
  faChartArea,
  faLock,
  faChartLine,
  faChartPie,
  faChartBar,
  faBuilding,
  faCalendar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const [userName, setUserName] = useState('');
  const [imageProfile,setImageProfile]=useState("");
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      axios.get(`http://localhost:8080/bytesfarms/user/getEmployees`)
        .then(response => {
          // Assuming the response is an array of employees
          const user = response.data.find(employee => employee.id.toString() === userId);

          if (user) {
            // setUserName(user.username);  // Change from 'name' to 'username'
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
      <header>
        {/* Sidebar */}
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse"
          style={{ backgroundColor: "#1B1A47", padding: "22px 0 0" }}
        >
          <a className="navbar-brand bg" style={{marginLeft:''}} href="#">
            <img
              src="assets/logo1.png"
              height="40px"
              alt="MDB Logo"
              loading="lazy"
              className="bg"
              style={{marginLeft:'22px'}}
            />
          </a>
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4" >
              <Link
                to="/dashboard"
                className=" p-2 ripple active bg"
                // aria-current="true" 
                
              >
                <FontAwesomeIcon
                  icon={faTachometerAlt}
                  className="fa-fw me-3 ml-1"
                />
                <span> Dashboard</span>
              </Link>
              <Link
                to="/recruitment"
                className="p-2 ripple active bg"
              >
                <FontAwesomeIcon icon={faChartArea} className="fa-fw me-3" />
                <span>Recruitment</span>
              </Link>
              <a href="#" className=" p-2 ripple active bg">
                <FontAwesomeIcon icon={faLock} className="fa-fw me-3" />
                <span>Payroll</span>
              </a>
             
              <Link to="/attendance" className="p-2 ripple active bg">
                <FontAwesomeIcon icon={faChartPie} className="fa-fw me-3" />
                <span>Attendance</span>
              </Link>
              
              <Link to="/leave-tracker" className="p-2 ripple active bg">
                <FontAwesomeIcon icon={faCalendar} className="fa-fw me-3" />
                <span>Leave Tracker</span>
              </Link>
              <Link to="/time-tracker" className="p-2 ripple active bg">
                <FontAwesomeIcon icon={faBuilding} className="fa-fw me-3" />
                <span>Time Tracker</span>
              </Link>

              {/* <a href="#" className="p-2 ripple active bg">
                <FontAwesomeIcon icon={faUsers} className="fa-fw me-3" />
                <span>Onboarding and Exit</span>
              </a> */}
              {/* <a className="text-white text-decoration-none font-weight-500 cursor-pointer mt-auto">LOGOUT</a> */}
            </div>
            <div className="list-group list-group-flush " style={{marginTop:'355px'}}>
            <Link to="/" className="p-2 m-2 ripple active bg">
            <img src="/assets/logout-icon.png" alt='logout'/>
                <span className="ml-1">LOG OUT</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Navbar */}
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand" href="#">
              <img
                src="assets/ByteWiseLogo.png"
                height="45px"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>
            <h4 className="text-align-left" style={{marginRight:'585px'}}>Welcome To ByteWise Manager!</h4>
            <form className="d-lg-flex  input-group w-auto my-auto">
              {/* <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              /> <FontAwesomeIcon icon={faSearch} className="input-group-text border-0"/>
              <span className="input-group-text border-0 " id="search-addon">
                
              </span> */}
            </form>
            <div className="d-flex">
            <div className="mr-2 font-weight-bold">{userName}</div>
            
            <div className="position top-0 end-0 ">
              <img
                src={`data:image/png;base64, ${imageProfile}`}
                className="rounded-circle"
                height="25"
                width="25"
                alt="profile"
                loading="lazy"
              />
            </div></div>
          </div>
        </nav>
      </header>

    
    </>
  );
};

export default Sidebar;
