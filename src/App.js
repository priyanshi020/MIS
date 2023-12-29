
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './AdminPages/LoginForm';
import Dashboard from './AdminPages/Dashboard';
import Dashboard1 from './UserPages/Dashboard1';
import Attendance from './AdminPages/Attendance';
import TimeTracker from './UserPages/TimeTracker';
import TimeTracker1 from './AdminPages/TimeTracker1';
import Attendance1 from './UserPages/Attendance1';
import LeaveTracker from './UserPages/LeaveTracker';
import LeaveTracker1 from './AdminPages/LeaveTracker1';
import Recruitment from './AdminPages/Recruitment';
import Recruitment1 from './UserPages/Recruitment1';
import Profile from './UserPages/Profile';
import Time from './AdminPages/Time';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/user-dashboard' element={<Dashboard1/>}/>
        <Route path='/attendance' element={<Attendance/>}/>
        <Route path='/user-attendance' element={<Attendance1/>}/>
        <Route path='/user-time-tracker' element={<TimeTracker/>}/>
        <Route path='/time-tracker' element={<TimeTracker1/>}/>
        <Route path='/time' element={<Time/>}/>
        <Route path='leave-tracker' element={<LeaveTracker1/>}/>
        <Route path='/user-leave-tracker' element={<LeaveTracker/>}/>
        <Route path='/recruitment' element={<Recruitment/>}/>
        <Route path='/user-recruitment' element={<Recruitment1/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>

    </Router>
    
    </>
  );
}

export default App;
