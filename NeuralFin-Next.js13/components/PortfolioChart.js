// components/PortfolioChart.js
import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
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

const generateDataFromAPI = async (days) => {

  const abortController = new AbortController();

  const response = await fetch('https://neuralfin-backend-production.up.railway.app/api/portfolio/portfolio-value-over-time/', {
      credentials: 'include',
      signal: abortController.signal,
  });

  const data = await response.json();

  return Object.keys(data).map((date) => ({
    date: format(new Date(date), 'yyyy-MM-dd HH:mm:ss'),
    value: data[date],
  }));
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
      <div className=" bg-opacity-90 rounded-md p-2 text-xs text-gray-800 shadow-md">
        <p>{`${label}`}</p>
        <p>{`Value: $${payload[0].value?.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};


const CustomTickFormatter = (tick) => {
  const date = new Date(tick);
  const hour = date.getHours();
  return hour === 0 ? format(date, 'MMM dd') : format(date, 'HH:mm');
};


const createCustomTicks = (data, numTicks) => {
  const step = Math.ceil(data.length / numTicks);
  return data.filter((_, index) => index % step === 0).map((item) => item.date);
};

const PortfolioChart = () => {
  const [selectedRange, setSelectedRange] = useState(timeRanges[2]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await generateDataFromAPI(selectedRange.days);
      setData(result);
    };
    fetchData();

  }, [selectedRange]);


  const customTicks = createCustomTicks(data, 14);

  return (
    <div>
      {/* ... */}
      <ResponsiveContainer width="100%" height={450}>
        <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#48BB78" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#48BB78" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickFormatter={CustomTickFormatter} ticks={customTicks} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#48BB78" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
          <Brush dataKey="date" fill='#121212' startIndex={Math.max(selectedRange.days - 7, 0)} height={15} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;