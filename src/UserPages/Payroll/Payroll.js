import React, { useState,useEffect } from "react";
import Sidebar1 from "../../components/Sidebar1";
import PieChartWithCenterLabel from "./PieChart";
import BasicLineChart from "./LineChart";
import { Button } from "@mui/material";
import axios from "axios";
const Payroll = () => {
  const [data, setData] = useState([]);
  const [payrollDetails, setPayrollDetails] = useState({
    grossSalary: 0,
    netPay: 0,
    deductions: 0,
    bonus: 0,
  });

  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;

  useEffect(() => {
    // Fetch current month data
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
    axios
      .get(`http://localhost:8080/bytesfarms/payroll/generatePayslip?userId=${userId}&month=${currentMonth}`)
      .then((response) => {
        const payrollDetails = response.data[0];

        console.log("Payroll API Response:", payrollDetails);

        if (payrollDetails) {
          setPayrollDetails({
            grossSalary: payrollDetails.grossSalary || 0,
            netPay: Number(payrollDetails.netPay.toFixed(2)) || 0,
            deductions: Number(payrollDetails.deductions.toFixed(2)) || 0,
            bonus: payrollDetails.bonus || 0,
          });
        } else {
          console.error("Invalid API response format:", payrollDetails);
        }                         
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });

    // Fetch all months data
    axios
      .get(`http://localhost:8080/bytesfarms/payroll/generatePayslip?userId=${userId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all data:", error.message);
      });
  }, [userId]);

  const handleDownloadPdf = (userId, month) => {
    const apiEndpoint = `http://localhost:8080/bytesfarms/payroll/generatePdf?userId=${userId}&month=${month}`;
  
    const requestData = {
      grossSalary: payrollDetails.grossSalary || 0,
      netPay: Number(payrollDetails.netPay.toFixed(2)) || 0,
      deductions: Number(payrollDetails.deductions.toFixed(2)) || 0,
      bonus: payrollDetails.bonus || 0,
      month: payrollDetails.month,
    };
  
    axios
      .post(apiEndpoint, requestData, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
  
        window.open(url, '_blank');
      })
      .catch((error) => {
        console.error('Error opening PDF:', error);
      });
  };
  


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
                    {payrollDetails.grossSalary}
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
                    {payrollDetails.netPay}
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
                   {payrollDetails.deductions}
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
                    {payrollDetails.bonus}
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
            <PieChartWithCenterLabel userId={userId}/>
          </div>
          <div className="card col col-md-5">
            <BasicLineChart />
          </div>
        </div>

        {/* table */}
        <div className="m-5">
        <table className="table rounded-4" style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px" }}>
            <thead className="table-secondary p-2">
              <tr>
                <th className="text-center" style={{ padding: "20px" }}>Month</th>
                <th style={{ padding: "20px" }}>Leave</th>
                <th style={{ padding: "20px" }}>Half Day</th>
                <th style={{ padding: "20px" }}>Pay Slip</th>
              </tr>
            </thead>
            <tbody className="p-2">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center" style={{ padding: "20px" }}>{item.month}</td>
                  <td style={{ padding: "20px" }}>{item.leaveDays}</td>
                  <td style={{ padding: "20px" }}>{item.halfDays}</td>
                  <td>
                    <Button
                      onClick={() => handleDownloadPdf(userId, item.month)}
                      className="text-white"
                      style={{ backgroundColor: "#1B1A47" }}
                    >
                      <img src='/assets/Download.png' alt='icon' className="mr-2" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table></div>
      </main>
    </>
  );
};

export default Payroll;
