import React, { useState } from "react";
import Sidebar1 from "../../components/Sidebar1";
import PieChartWithCenterLabel from "./PieChart";
import BasicLineChart from "./LineChart";
import { Button } from "@mui/material";
const Payroll = () => {
  const [data, setData] = useState("");
  return (
    <>
      <Sidebar1 />
      <main style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-5">
          <h3 className="pb-3">Payroll</h3>
          <div className="d-flex">
            <div className=" col-md-3 ">
              <div className="d-flex   p-3 bg-white shadow shadow-lg rounded-4 ">
                <img
                  src="/assets/payroll/gross-salary.png"
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
                  src="/assets/payroll/net-pay.png"
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
                  src="/assets/payroll/ic-deduction.png"
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
                  src="/assets/payroll/ic-bonus.png"
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
        <div className="d-flex justify-content-around">
          <div className=" card  py-4 bg-white  col col-md-5 shadow shadow-lg">
            <PieChartWithCenterLabel />
          </div>
          <div className="card col col-md-5">
            <BasicLineChart />
          </div>
        </div>

        {/* table */}
        <div className="m-5">
        <table
          class="table rounded-4 "
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
          }}
        >
          <thead class="table-secondary p-2">
            <tr>
              <th
                className="text-center"
                scope="col"
                style={{ padding: "20px" }}
              >
                Month
              </th>
              <th scope="col" style={{ padding: "20px" }}>
                Leave
              </th>
              <th style={{ padding: "20px" }}>Half Day</th>
              <th style={{ padding: "20px" }}>Deduction</th>
              <th style={{ padding: "20px" }}>Pay Slip</th>
            </tr>
          </thead>
          <tbody className="p-2">
            {/* {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                  </td>
                 
                </tr>
              ))} */}
            <tr>
              <td className="text-center" style={{ padding: "20px" }}>December</td>
              <td style={{ padding: "20px" }}>3</td>
              <td style={{ padding: "20px" }}>4</td>
              <td style={{ padding: "20px" }}>6</td>
              <td>
                          {/* {application.fileData && ( */}
                            <Button
                            // onClick={() => downloadPdf(application.fileData, application.user.username)}
                              className="text-white"
                              style={{ backgroundColor: "#1B1A47" }}
                            ><img src='/assets/Download.png' alt='icon' className="mr-2"/>
                              Download
                            </Button>
                          {/* )} */}
                        </td>
            </tr>
          </tbody>
        </table></div>
      </main>
    </>
  );
};

export default Payroll;
