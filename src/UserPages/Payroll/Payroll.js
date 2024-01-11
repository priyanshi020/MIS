import React from 'react'
import Sidebar1 from '../../components/Sidebar1'
import PieChartWithCenterLabel from './PieChart'
 import BasicLineChart from './LineChart'
const Payroll = () => {
  return (
    <>
        <Sidebar1 />
      <main style={{ backgroundColor: "#F0F5FD" }}> 
      <div className="m-5">
        <h3 className="m-3 pt-3 pb-3">Payroll</h3>
        <div className="d-flex">
            <div className=" col-md-3 ">
              <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                <img
                  src="/assets/dashboard/emp.png"
                  alt="emp"
                  className="mr-3"
                  style={{ width: "62px", height: "62px" }}
                />
                <div className="d-flex  row">
                  <span
                    className="d-block mb-2"
                    style={{
                      fontSize: "23px",
                      fontWeight: "700",
                      lineHeight: "28px",
                    }}
                  >
                     {/* {employeeCount} */}
                     25000
                  </span>
                  <p
                    className=" mb-2"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    Gross Salary
                  </p>
                </div>
              </div>
            </div>

            <div className=" col-md-3 ">
              <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                <img
                  src="/assets/dashboard/proj.png"
                  alt="emp"
                  className="mr-3"
                  style={{ width: "60px", height: "60px" }}
                />
                <div className="d-flex  row">
                  <span
                    className="d-block mb-2"
                    style={{
                      fontSize: "23px",
                      fontWeight: "700",
                      lineHeight: "28px",
                    }}
                  >
                    25000
                  </span>
                  <p
                    className=" mb-2"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    Net Pay
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-md-3 ">
              <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                <img
                  src="/assets/dashboard/pre.png"
                  alt="emp"
                  className="mr-3"
                  style={{ width: "62px", height: "62px" }}
                />
                <div className="d-flex  row">
                  <span
                    className="d-block mb-2"
                    style={{
                      fontSize: "23px",
                      fontWeight: "700",
                      lineHeight: "28px",
                    }}
                  >
                    {/* {checkedInCount} */}
                    25000
                  </span>
                  <p
                    className=" mb-2"
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    Deduction Amount
                  </p>
                </div>
              </div>
            </div>
            <div className=" col-md-3 ">
              <div
                className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 "
                // style={{ backgroundColor: "#1B1A47" }}
              >
                <img
                  src="/assets/dashboard/abs.png"
                  alt="emp"
                  className="mr-3"
                  style={{ width: "62px", height: "62px" }}
                />
                <div className="d-flex  row">
                  <span
                    className="d-block mb-2 "
                    style={{
                      fontSize: "23px",
                      fontWeight: "700",
                      lineHeight: "28px",
                    }}
                  >
                   {/* {checkedOutCount} */}
                   25000
                  </span>
                  <p
                    className=" mb-2 "
                    style={{ fontSize: "14px", fontWeight: "500" }}
                  >
                    Bonus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-around'>
        <div className=" card  py-4 bg-white  col col-md-5 shadow shadow-lg" >

            <PieChartWithCenterLabel/>
          </div>
          <div className='card col col-md-5'>
            <BasicLineChart/>
          </div>
          </div>
        </main>
    </>
  )
}

export default Payroll