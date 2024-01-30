import "./App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./AdminPages/LoginForm";
import Dashboard from "./AdminPages/Dashboard";
import Dashboard1 from "./UserPages/Dashboard1";
import Attendance from "./AdminPages/Attendance";
import TimeTracker from "./UserPages/TimeTracker";
import TimeTracker1 from "./AdminPages/TimeTracker1";
import Attendance1 from "./UserPages/Attendance1";
import LeaveTracker from "./UserPages/LeaveTracker";
import LeaveTracker1 from "./AdminPages/LeaveTracker1";
import Recruitment from "./AdminPages/Recruitment";
import Recruitment1 from "./UserPages/Recruitment1";
import Profile from "./UserPages/Profile";
import Time from "./AdminPages/Time";
import Recruitment2 from "./components/Recruitment2";
import LoginGuest from "./components/LoginGuest";
import OtpForm from "./components/OtpForm";
import ForgotPass from "./components/ForgotPass";
import Payroll from "./UserPages/Payroll/Payroll";
import CompanyPolicy from "./UserPages/CompanyPolicy";
import CompanyPolicy1 from "./AdminPages/CompanyPolicy1";
import InterviewSchedule from "./AdminPages/core/InterviewSchedule";
import { useNavigate } from "react-router-dom";
import Policy from "./UserPages/Policy";
import Onboarding from "./UserPages/Onboarding";
import Policy1 from "./AdminPages/Policy1";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    let logoutTimer;
    let loginTime;
    if (loginTime) {
      const resetTimer = () => {
        if (logoutTimer) {
          clearTimeout(logoutTimer);
        }
        const excludedPages = ["/", "log"];
        if (!excludedPages.includes(window.location.pathname)) {
          logoutTimer = setTimeout(() => {
            handleLogout();
          }, 30 * 60 * 1000);
        }
      };
    } else {
      handleRefresh();
    }
  }, []);

  const handleLogout = () => {
    setLogout(true);
  };

  const handleRefresh = () => {
    const excludedPages = ["/", "/log"];
    if (!excludedPages.includes(window.location.pathname)) {
      setLogout(true);
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <>
        <Routes>
          <Route path="/log" element={<LoginGuest />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-dashboard" element={<Dashboard1 />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/user-attendance" element={<Attendance1 />} />
          <Route path="/user-payroll" element={<Payroll />} />
          <Route path="/user-time-tracker" element={<TimeTracker />} />
          <Route path="/time-tracker" element={<TimeTracker1 />} />
          <Route path="/time" element={<Time />} />
          <Route path="leave-tracker" element={<LeaveTracker1 />} />
          <Route path="/user-leave-tracker" element={<LeaveTracker />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/user-recruitment" element={<Recruitment1 />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/apply" element={<Recruitment2 />} />
          <Route path="otp-form" element={<OtpForm />} />
          <Route path="/updatepassword" element={<ForgotPass />} />
          <Route path="/user-company-policy" element={<CompanyPolicy />} />
          <Route path="/company-policy" element={<CompanyPolicy1 />} />
          <Route path="/policy" element={<Policy/>}/>
          <Route path ='/policy1' element={<Policy1/>}/>
          <Route path="/interview-schedule" element={<InterviewSchedule />} />
          <Route path='/onboarding-exit' element={<Onboarding/>}/>
        </Routes>
      
    </>
  );
}

export default App;
