import { format, parseISO } from 'date-fns';
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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
  stockData: StockData[];
  isOpen: boolean;
  onClose: () => void;
};

const StockChartModal = ({ stockData, isOpen, onClose }: StockChartModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg" className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 bg-gray-900 opacity-90 z-1"></div>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="absolute inset-0 flex justify-start z-15">
          <ModalHeader toggle={onClose}>
            <button className="btn btn-secondary" onClick={onClose}>
              X
            </button>
          </ModalHeader>
        </div>
        <div className=" w-5/6 h-5/6">
          <ModalBody className="h-full">
            <ResponsiveContainer width="100%" height="100%">
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
                <YAxis tickCount={6} orientation='right' domain={['dataMin - 10', 'dataMax']} axisLine={false}  tickFormatter={(tick) => Math.round(tick)} strokeWidth={0} />
                <CartesianGrid strokeOpacity={0.2} />
                <Tooltip labelFormatter={(date) => format(parseISO(date as string), 'PPPPppp')} />
                <Area type="monotone" dataKey="Close" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="Open" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </ModalBody>
        </div>
      </div>
    </Modal>
  );
};

export default StockChartModal;
