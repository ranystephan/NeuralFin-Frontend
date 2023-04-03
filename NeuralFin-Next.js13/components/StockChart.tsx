import React, { useEffect, useState } from 'react';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { parseISO, format, subDays, subWeeks, subMonths, subYears, startOfYear } from 'date-fns';
import StockChartModal from './StockChartModal';
import expand_ios from '../public/LogosItems/expand_ios.png';
import Image from 'next/image';


const styles = {
  tooltip: "rounded font-bold ",
  chartRangeButton: "hover:bg-gray-200 font-bold py-2 px-2 rounded ",

};

type StockData = {
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
  Dividends: number;
  'Stock Splits': number;
  date: string;
};

type StockResponse = {
  stock_data: StockData[];
};

type StockChartProps = {
  symbol: string;
};

type CustomTooltipProps = {
  active: boolean;
  payload: Array<{ value: number }>;
  label: string;
}


function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active) {
    return (
      <div className={styles.tooltip}>
        <h4>{format(parseISO(label), 'PPPP')}</h4>
        <p>Open: {payload[0].value.toFixed(2)}</p>
        <p>High: {payload[1].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
}


type ChartRange = '1D' | '1W' | '1M' | '3M' | '6M' | 'YTD' | 'ALL';


const StockChart = (props: StockChartProps) => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [chartRange, setChartRange] = useState<ChartRange>('1W');
  const [isModalOpen, setIsModalOpen] = useState(false);



  useEffect(() => {
    const fetchStockData = async () => {
      const apiUrl_deployed = `https://neuralfin-backend-production.up.railway.app/api/stocks/${props.symbol}/`;
      const apiUrl_local = `http://localhost:8000/api/stocks/${props.symbol}/`;
      const response = await fetch(apiUrl_deployed);
      const data: StockResponse = await response.json();

      // Filter the data based on the selected chart range
      let filteredData = data.stock_data;
      const endDate = new Date();
      switch (chartRange) {
        case '1D':
          filteredData = data.stock_data.filter((d) => parseISO(d.date) >= subDays(endDate, 1));
          break;
        case '1W':
          filteredData = data.stock_data.filter((d) => parseISO(d.date) >= subWeeks(endDate, 1));
          break;
        case '1M':
          filteredData = data.stock_data.filter((d) => parseISO(d.date) >= subMonths(endDate, 1));
          break;
        case '3M':
          filteredData = data.stock_data.filter((d) => parseISO(d.date) >= subMonths(endDate, 3));
          break;
        case '6M':
          filteredData = data.stock_data.filter((d) => parseISO(d.date) >= subMonths(endDate, 6));
          break;
        case 'YTD':
          filteredData = data.stock_data.filter((d) => parseISO(d.date) >= startOfYear(endDate));
          break;
        case 'ALL':
          // no filter needed
          break;
        default:
          break;
      }

      setStockData(filteredData);
    };

    fetchStockData();
  }, [props.symbol, chartRange]);

  return (
    <div>
      <div className='flex items-center justify-start'>
        <button onClick={() => setIsModalOpen(true)} className={`${styles.chartRangeButton}`}>
          <Image src={expand_ios} alt="expand" width={15} height={15} />
        </button>

        {isModalOpen && <StockChartModal stockData={stockData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}

        <button 
          onClick={() => setChartRange('1D')}
          className={`${styles.chartRangeButton} ${chartRange === '1D' && 'bg-gray-300'}`}
        >
          1D
        </button>
        <button 
          onClick={() => setChartRange('1W')}
          className={`${styles.chartRangeButton} ${chartRange === '1W' && 'bg-gray-300'}`}
        >
          1W 
        </button>
        <button 
          onClick={() => setChartRange('1M')}
          className={`${styles.chartRangeButton} ${chartRange === '1M' && 'bg-gray-300'}`}
        >
          1M 
        </button>
        <button 
          onClick={() => setChartRange('3M')}
          className={`${styles.chartRangeButton} ${chartRange === '3M' && 'bg-gray-300'}`}
        >
          3M 
        </button>
        <button 
          onClick={() => setChartRange('6M')}
          className={`${styles.chartRangeButton} ${chartRange === '6M' && 'bg-gray-300'}`}
        >
          6M 
        </button>
        <button 
          onClick={() => setChartRange('YTD')}
          className={`${styles.chartRangeButton} ${chartRange === 'YTD' && 'bg-gray-300'}`}
        >
          YTD 
        </button>
        <button 
          onClick={() => setChartRange('ALL')}
          className={`${styles.chartRangeButton} ${chartRange === 'ALL' && 'bg-gray-300'}`}
        >
          ALL
        </button>
      </div>

      <ResponsiveContainer width="100%" height={700}>
        <AreaChart data={stockData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tickFormatter={(date) => format(parseISO(date), 'MMM dd')} />
          <YAxis tickCount={6} orientation='right' domain={['dataMin - 10', 'dataMax']} axisLine={false}  tickFormatter={(tick) => Math.round(tick).toString()} strokeWidth={0} />
          <CartesianGrid strokeOpacity={0.2} />
          <Tooltip content={<CustomTooltip active={false} payload={[]} label={''} />} position={{ x: 0, y: 0 }}  />
          <Area type="monotone" dataKey="Close" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="Open" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
      </div>
      );
      };

  export default StockChart;


