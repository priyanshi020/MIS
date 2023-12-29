import React from "react";
import Sidebar from "../components/Sidebar";

const Attendance = () => {
  return (
    <>
      <Sidebar />
      <main
        className="m-5  "
        style={{ marginLeft: "", backgroundColor: "#F4F7Fc" }}
      >
        <h3 className="mb-3">TIMESHEET</h3>
        <table class="   shadow shadow-lg rounded-4 table  ">
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
                    {/* <p class="text-muted mb-0">john.doe@gmail.com</p> */}
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
                    {/* <p class="text-muted mb-0">john.doe@gmail.com</p> */}
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
                    {/* <p class="text-muted mb-0">john.doe@gmail.com</p> */}
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
          {/* <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.empId}</td>
            <td>{employee.user}</td>
            {employee.hasData ? (
              <>
                <td>{employee.inTime}</td>
                <td>{employee.outTime}</td>
                <td>{employee.workTime}</td>
                <td>{employee.breakTime}</td>
                <td>{employee.overTime}</td>
              </>
            ) : (
              <td colSpan="6">No data available</td>
            )}
          </tr>
        ))}
      </tbody> */}
        </table>
      </main>
    </>
  );
};

export default Attendance;
