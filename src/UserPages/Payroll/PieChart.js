import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as d3 from 'd3'; // Import d3 library

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

export default function PieChartWithCenterLabel() {
  const [apiData, setApiData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/bytesfarms/payroll/allData?userId=3`)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error.message);
      });
  }, []);

  const colorScale = getColorScale(apiData.length);

  return (
    <PieChart
      series={[
        {
          data: apiData.map((item) => ({ value: item.value, label: item.label })),
          innerRadius: 75,
          cornerRadius: 20,
          padAngle: 10,
        },
      ]}
      colorScale={colorScale} // Use dynamically generated color scale
      {...size}
    >
      <PieCenterLabel>{apiData.length > 0 ? apiData[0].value : 0}</PieCenterLabel>
    </PieChart>
  );
}

// Function to generate a color scale based on the number of data points
function getColorScale(dataLength) {
  // You can replace this logic with any color scale generation algorithm
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(d3.range(dataLength));
  return colorScale;
}
