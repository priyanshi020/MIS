import React from "react";
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

const Sidebar1 = () => {
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
                to="/user-dashboard"
                className="list-group-item-action py-2 ripple bg"
                aria-current="true" 
                
              >
                <FontAwesomeIcon
                  icon={faTachometerAlt}
                  className="fa-fw me-3"
                />
                <span> Dashboard</span>
              </Link>
              <Link
                to="/user-recruitment"
                className="p-2 ripple active bg"
              >
                <FontAwesomeIcon icon={faChartArea} className="fa-fw me-3" />
                <span>Recruitment</span>
              </Link>
              <a href="#" className=" p-2 ripple active bg">
                <FontAwesomeIcon icon={faLock} className="fa-fw me-3" />
                <span>Payroll</span>
              </a>
             
              <Link to="/user-attendance" className="p-2 ripple active bg">
                <FontAwesomeIcon icon={faChartPie} className="fa-fw me-3" />
                <span>Attendance</span>
              </Link>
              
              <Link to="/user-leave-tracker" className="p-2 ripple active bg">
                <FontAwesomeIcon icon={faCalendar} className="fa-fw me-3" />
                <span>Leave Tracker</span>
              </Link>
              <Link to="/user-time-tracker" className="p-2 ripple active bg">
                <FontAwesomeIcon icon={faBuilding} className="fa-fw me-3" />
                <span>Time Tracker</span>
              </Link>

              <a href="#" className="p-2 ripple active bg">
                <FontAwesomeIcon icon={faChartBar} className="fa-fw me-3" />
                <span>Company Policy</span>
              </a>
              {/* <a className="text-white text-decoration-none font-weight-500 cursor-pointer mt-auto">LOGOUT</a> */}
            </div>
          </div>
        </nav>

        {/* Navbar */}
        {/* <nav
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
            <form className="d-lg-flex  input-group w-auto my-auto">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              /> <FontAwesomeIcon icon={faSearch} className="input-group-text border-0"/>
              <span className="input-group-text border-0 " id="search-addon">

              </span>
            </form>
          
            <div className="position-fixed top-0 end-0 m-3">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </div>
          </div>
        </nav> */}
      </header>

      <main style={{ backgroundColor:'#F4F7Fc'}}>
      <div className="container  ">
          {/* Your Content Here */}
         
          {/* Add more cards or content as needed */}
        </div>
      </main>
    </>
  );
};

export default Sidebar1;
