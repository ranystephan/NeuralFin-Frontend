import { format, parseISO } from 'date-fns';
import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const styles = {
  modalContainer: "fixed top-0 left-0 w-full h-full z-900 bg-black ",
  modalContent: "relative ",
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



type StockChartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  stockData: StockData[];
};

const StockChartModal = (props: StockChartModalProps) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={props.stockData}>
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
          <YAxis tickCount={6} orientation='right' domain={['dataMin - 10', 'dataMax']} axisLine={false}  tickFormatter={(tick) => Math.round(tick)} strokeWidth={0} />
          <CartesianGrid strokeOpacity={0.2} />
          <Tooltip labelFormatter={(date) => format(parseISO(date as string), 'PPPPppp')} />
          <Area type="monotone" dataKey="Close" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="Open" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default StockChartModal;


    {/* <Modal open={props.isOpen} onClose={props.onClose} center>
      <ResponsiveContainer width="100%" height={700}>
        <AreaChart data={props.stockData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Close" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </Modal> */}