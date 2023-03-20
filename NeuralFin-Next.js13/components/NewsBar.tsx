'use client'


import { useState, useEffect } from 'react';


type NewsData = {
  title: string;
  summary: string;
};

type NewsBarProps = {
  symbol: string;
};

const NewsBar = (props: NewsBarProps) => {
  const [newsData, setNewsData] = useState(null as NewsData[] | null);
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;


  useEffect(() => {
    fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${props.symbol}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => setNewsData(data.articles));
  }, [props.symbol]);

  return (
    <div style={{ height: '400px', overflowY: 'scroll' }}>
      {newsData && newsData.map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsBar;
