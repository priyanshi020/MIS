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
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []); 


  return (
    <>
      <Sidebar />
      <main className="m-5" style={{backgroundColor:'#F0F5FD'}}>
        <h3 className="mb-3">Time Tracker</h3>
        
         <table class="table rounded-4 " >
            <thead class="table-secondary p-2">
              <tr>
                <th  className='text-center' scope="col">S.No</th>
                <th scope="col">Name</th>
                
                <th scope="col">Email Id</th>
              <th>Task List</th>

              
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.username}</td>
                
                  <td>{item.email}</td>
                 <td><ViewTask userId={item.id} /></td>
                  
                </tr>
              ))}
            </tbody>
          </table>
      </main>
    </>
  );
};

export default TimeTracker1;
