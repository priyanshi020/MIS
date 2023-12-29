import React, {useEffect,useState} from "react";
import Sidebar from "../components/Sidebar";
import ViewTask from "./core/ViewTask";
import axios from "axios";

const TimeTracker1 = () => { 
  const [data, setData] = useState([]);
  console.log("data",data)

  useEffect(() => {
    // Fetch data from your API endpoint using axios
    axios
      .get("http://localhost:8080/bytesfarms/user/getEmployees") // Replace 'YOUR_API_ENDPOINT' with the actual endpoint URL
      .then((response) => {
        setData(response.data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []); 


  return (
    <>
      <Sidebar />
      <main className="m-5">
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
