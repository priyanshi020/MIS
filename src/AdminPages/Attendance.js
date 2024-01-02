import React,{useState,useEffect} from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import ViewAttendance from "./core/ViewAttendance";
const Attendance = () => {
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
      <main
        className="m-5  "
        style={{ marginLeft: "", backgroundColor: "#F0F5FD" }}
      >
        <h3 className="mb-3">TIMESHEET</h3>
        <table class="table rounded-4 " >
            <thead class="table-secondary p-2">
              <tr>
                <th  className='text-center' scope="col">S.No</th>
                <th scope="col">Name</th>
                <th>Email</th>
              <th>Attendance</th>
               

              
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td><ViewAttendance userId={item.id}/></td>
               <td></td>

                
                  
                </tr>
              ))}
            </tbody>
          </table>
        {/* <table class="   shadow shadow-lg rounded-4 table  ">
          <thead class="table-secondary">
            <tr className="">
              <th className="text-center">Emp ID</th>
              <th>User</th>
              <th>In Time</th>
              <th>Out Time</th>
              <th>Work Time</th>
              <th>Break Time</th>
              <th className='text-center'>Over Time </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">101</td>
              <td>
                <div class="d-flex align-items-start">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">John Doe</p>
                   
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">10.00 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">08.30 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">09.30 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">00.45 </p>
              </td>
              <td className='text-center'>
                <p class="fw-normal mb-1">01.00 </p>
              </td>
            </tr>
            <tr>
              <td>101</td>
              <td>
                <div class="d-flex align-items-start">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">John Doe</p>
                    
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">10.00 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">08.30 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">09.30 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">00.45 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">01.00 </p>
              </td>
            </tr>
            <tr>
              <td>101</td>
              <td>
                <div class="d-flex align-items-start">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    class="rounded-circle"
                  />
                  <div class="ms-3">
                    <p class="fw-bold mb-1">John Doe</p>
                
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">10.00 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">08.30 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">09.30 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">00.45 </p>
              </td>
              <td>
                <p class="fw-normal mb-1">01.00 </p>
              </td>
            </tr>
          </tbody>
          
        </table> */}
      </main>
    </>
  );
};

export default Attendance;
