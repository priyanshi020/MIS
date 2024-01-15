import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  const chartStyle = {
    boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.1)', // You can customize the shadow values
  };

  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={500}
      height={300}
      style={chartStyle}  // Apply the style to the LineChart
    />
  );
}
