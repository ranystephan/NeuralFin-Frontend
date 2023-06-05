import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

interface BenchmarkDataPoint {
  date: string;
  close: number;
}

const BenchmarkChart: React.FC = () => {
  const [data, setData] = useState<BenchmarkDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const fetchBenchmarkData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPY&interval=5min&apikey=${API_KEY}`
        );
        const responseData = await response.json();

        if (responseData['Time Series (5min)']) {
          const timeSeries = responseData['Time Series (5min)'];
          const dataPoints: BenchmarkDataPoint[] = [];

          for (const date in timeSeries) {
            if (timeSeries.hasOwnProperty(date)) {
              const close = parseFloat(timeSeries[date]['4. close']);
              dataPoints.push({ date, close });
            }
          }

          const closePrices = dataPoints.map((dataPoint) => dataPoint.close);
          const minPrice = Math.min(...closePrices);
          const maxPrice = Math.max(...closePrices);

          setYAxisDomain([minPrice, maxPrice]);
          setData(dataPoints.reverse());
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching benchmark data:', error);
        setLoading(false);
      }
    };

    fetchBenchmarkData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" hide />
        <YAxis domain={yAxisDomain} hide />
        <Tooltip contentStyle={{ backgroundColor: 'white', color: 'black'}} />
        <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BenchmarkChart;
