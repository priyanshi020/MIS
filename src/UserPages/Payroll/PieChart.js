import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import axios from 'axios';
 
const size = {
  width: 450,
  height: 200,
};
 
const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 18,
  fontWeight: 500,
}));
 
const CenteredTextContainer = styled('g')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
 
function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <CenteredTextContainer>
      <StyledText x={left + width / 2} y={top + height / 2 - 15}>
        {children}
      </StyledText>
      <StyledText x={left + width / 2} y={top + height / 2 + 20}>
        Gross Salary
      </StyledText>
    </CenteredTextContainer>
  );
}
 
const PieChartWithCenterLabel = () => {
  const [payrollData, setPayrollData] = useState(null);
  const storedUserId = localStorage.getItem("userId");
  const userId = storedUserId ? parseInt(storedUserId, 10) : null;
  useEffect(() => {
    // Fetch data from the API
    axios.get(`http://localhost:8080/bytesfarms/payroll/allData?userId=${userId} &month=DECEMBER`)
      .then(response => {
        setPayrollData(response.data[0]); // Assuming the API returns an array with a single object
      })
      .catch(error => {
        console.error('Error fetching payroll data:', error);
      });
  }, []);
 
  if (!payrollData) {
    
    return <div>Loading...</div>;
  }
 
  const data = [
    { value: parseFloat(payrollData.grossSalary), label: 'Gross Salary' },
    { value: parseFloat(payrollData.deductions), label: 'Deductions' },
    { value: parseFloat(payrollData.netPay), label: 'Net Pay' },
    { value: parseFloat(payrollData.bonus), label: 'Bonus' },
  ];
 
  return (
    <PieChart series={[{ data, innerRadius: 75, padAngle: 10 }]} colors={['#D1D7FF', '#E9156E', '#353DE1', '#FEA41D']} {...size}>
      <PieCenterLabel>{payrollData.grossSalary}</PieCenterLabel>
    </PieChart>
  );
};
 
export default PieChartWithCenterLabel;