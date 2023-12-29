import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function Chart() {
  const barColors = ['#1B1A47', '#33FF57', '#5733FF', '#FF33A8', '#33A8FF', '#A8FF33', '#FFD700'];

  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'Hrs ', id: 'pvId', stack: '' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
      colors={barColors}
      className='card'
    />
  );
}
