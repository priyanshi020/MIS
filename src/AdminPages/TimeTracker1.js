import React, {useEffect,useState} from "react";
import Sidebar from "../components/Sidebar";
import ViewTask from "./core/ViewTask";
import axios from "axios";

const TimeTracker1 = () => { 
  const [data, setData] = useState([]);

  useEffect(() => {
   
    axios
      .get("http://localhost:8080/bytesfarms/user/getEmployees")
      .then((response) => {
        setData(response.data); 
        const taskId=response.data.id;
        console.log("yeh hu userdi h ",taskId)
        localStorage.setItem('userId', taskId.toString());
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []); 


  return (
    <>
      <Sidebar />
      <main className="" style={{backgroundColor:'#F0F5FD'}}>
        <div className="m-5">
        <h3 className="m-3 pt-3 pb-3">Time Tracker</h3>
        
         <table class="table rounded-4 " style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px'}}>
            <thead class="table-secondary p-2">
              <tr>
                <th  className='text-center' scope="col" style={{padding:'20px'}}>S.No</th>
                <th scope="col" style={{padding:'20px'}}>Name</th>
                
                <th scope="col" style={{padding:'20px'}}>Email Id</th>
              <th style={{padding:'20px'}}>Task List</th>

              
              </tr>
            </thead>
            <tbody>
              {data.map((item,index) => (
                <tr key={item.id}>
                  <td className="text-center">{index+1}</td>
                  <td>{item.username}</td>
                
                  <td>{item.email}</td>
                 <td><ViewTask userId={item.id} /></td>
                  
                </tr>
              ))}
            </tbody>
          </table></div>
      </main>
    </>
  );
};

export default TimeTracker1;
