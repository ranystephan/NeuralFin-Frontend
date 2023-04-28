// components/PortfolioChart.js
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  Brush,
} from 'recharts';
import { format } from 'date-fns';

const generateRandomData = (days) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    data.push({
      date: format(currentDate, 'MM/dd/yyyy'),
      value: Math.floor(Math.random() * 10000) + 5000,
      volume: Math.floor(Math.random() * 1000) + 500,
    });
  }
  return data;
};

const timeRanges = [
  { label: '1D', days: 1 },
  { label: '1W', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '6M', days: 180 },
  { label: 'ALL', days: 365 },
];


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 p-2 text-xs text-white">
        <p>{`${label}`}</p>
        <p>{`Value: $${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const PortfolioChart = () => {
  const [selectedRange, setSelectedRange] = useState(timeRanges[2]);
  const data = generateRandomData(selectedRange.days);

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-1 w-full">
        {timeRanges.map((range) => (
          <button
            key={range.label}
            className={`px-2 py-1 rounded text-sm ${
              range.label === selectedRange.label ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSelectedRange(range)}
          >
            {range.label}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400} className='w-full' >
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={['dataMin', 'dataMax']} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} name="Portfolio Value" />
          <Brush dataKey="date" fill='transparent' startIndex={selectedRange.days - 30} height={20}/>
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} hide />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="volume" fill="#8884d8" name="Volume"  />
          <Brush dataKey="date" fill='transparent' startIndex={selectedRange.days - 30} height={20}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;