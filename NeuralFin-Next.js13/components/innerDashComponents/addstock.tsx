import { Fragment, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/innerDashComponents/dialog";
import { Button } from "@/components/innerDashComponents/button";
import { Input } from "@/components/innerDashComponents/input";
import { Label } from "@/components/innerDashComponents/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/innerDashComponents/select";
import { PlusCircle } from "lucide-react";
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';


type Stock = {
  id: number;
  symbol: string;
  name: string;
};


export default function AddStock() {
  const [showDialog, setShowDialog] = useState(false);
  const [ticker, setTicker] = useState('');
  const [shares, setShares] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      const apiUrl_deployed = `https://api.neuralfin.xyz/api/stock/stocks/`;
      const apiUrl_local = `http://localhost:8000/api/stock/stocks/`;
      const response = await fetch(`https://api.neuralfin.xyz/api/stock/stocks/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setStocks(data);
        } else {
          console.log('Error: data.results is not an array');
        }
      } else {
        // Handle error
      }
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    if (ticker === '') {
      setFilteredStocks([]);
    } else {
      const filtered = stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(ticker.toLowerCase()) ||
        stock.name.toLowerCase().includes(ticker.toLowerCase())
      );
      setFilteredStocks(filtered);
    }
  }, [ticker, stocks]);

  const handleTickerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value);
  };

  const handleTickerSelect = (stock: Stock) => {
    setTicker(stock.symbol);
    setSelectedStock(stock);
    setFilteredStocks([]);
  };

  const submitData = async () => {
    // Your API endpoint
    const apiUrl_deployed = `https://api.neuralfin.xyz/api/portfolio/portfolio-items/`;
    const apiUrl_local = `http://localhost:8000/api/portfolio/portfolio-items/`;


    if (selectedStock) { // Check if selectedStock is not null
        const response = await fetch(apiUrl_local, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            portfolio: 2,
            stock: Number(selectedStock.id),
            shares: Number(shares),
            purchase_price: Number(price),
            transaction_type: type,
            transaction_date: date,
          })
        });


    if (!response.ok) {
      // Handle error
    }

    setShowDialog(false);
  } else {
    // Handle error
  }
};

  return (
    <>
      <Button onClick={() => setShowDialog(true)}>
        <PlusCircle className="mr-2 h-5 w-5" />
        Add Stock
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add Stock
            </DialogTitle>
            <DialogDescription>
              Fill in the details of the stock you want to add.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="ticker">Search Ticker</Label>
              <div className="relative">
                <Input 
                  id="ticker" 
                  value={ticker} 
                  onChange={handleTickerInputChange} 
                  className="w-full border border-gray-300 rounded"
                />
                <MagnifyingGlassIcon className="absolute right-2 top-2 h-5 w-5" />
                {filteredStocks.length > 0 && (
                  <div className="absolute w-full bg-black bg-opacity-95 backdrop-blur-3xl transition-all duration-100 border border-white rounded shadow-lg max-h-60 overflow-auto scrollbar-hide">
                    {filteredStocks.map(stock => (
                      <div 
                        key={stock.id} 
                        onClick={() => handleTickerSelect(stock)}
                        className="relative px-3 py-2 cursor-pointer hover:bg-gray-800"
                      >
                        <div className="flex justify-between items-center py-2">
                          <span className="block truncate">
                            {stock.symbol}
                          </span>
                          <span className="block truncate">
                            {stock.name}
                          </span>

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shares">Number of Shares</Label>
              <Input id="shares" value={shares} onChange={(e) => setShares(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (optional)</Label>
              <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={(value) => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date (optional)</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button 
              type="submit"
              onClick={submitData}
            >
              Add Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
