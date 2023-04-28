/* 'use client'


import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { LinearScale } from 'chart.js';
import { Chart } from 'chart.js/auto';


Chart.register(LinearScale);


interface ChartComponentProps {
  portfolioData: any;
}


const ChartComponent: React.FC<ChartComponentProps> = ({ portfolioData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 2,
      },
    ],
  });

  
  useEffect(() => {
    const prepareChartData = () => {
      const dates = portfolioData.map((data: any) => data.date);
      const values = portfolioData.map((data: any) => data.value);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Portfolio Value',
            data: values,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 2,
          },
        ],
      });
    };

    prepareChartData();

  }, [portfolioData]);

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};



export default ChartComponent; */