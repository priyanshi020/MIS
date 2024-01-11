import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const data = [
  { value: 5, label: 'Bonus' },
  { value: 10, label: 'Deduction' },
  { value: 15, label: 'Net Pay' },
  { value: 20, label: 'Gross Salary' },
];

const size = {
  width: 450,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 18,
  fontWeight:500,
  
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
    <StyledText x={left + width / 2} y={top + height / 2 +20}>
      Gross Salary
    </StyledText>
  </CenteredTextContainer>
  );
}

export default function PieChartWithCenterLabel() {
  return (
    <PieChart
    series={[{ data, innerRadius: 75 }]}
    colors={['#D1D7FF', '#E9156E', '#353DE1', '#FEA41D']} // Change pie chart colors
    {...size}
  >
      <PieCenterLabel>25000</PieCenterLabel>
      {/* <PieCenterLabel>Gross Salary</PieCenterLabel> */}

    </PieChart>
  );
}