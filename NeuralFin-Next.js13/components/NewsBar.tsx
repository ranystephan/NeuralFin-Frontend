import { useState, useEffect } from 'react';

type NewsData = {
  title: string;
  summary: string;
};

type NewsBarProps = {
  symbol: string;
};

const NewsBar = (props: NewsBarProps) => {
  const [newsData, setNewsData] = useState([] as NewsData[]);
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const fetchNewsData = async () => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${props.symbol}&apikey=${apiKey}`);
      const data = await response.json();
      const articles = data.feed.map((article: { title: any; summary: any; }) => ({
        title: article.title,
        summary: article.summary,
      }));
      setNewsData(articles);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  }

  useEffect(() => {
    fetchNewsData();
  }, [props.symbol]);


  return (
    <div className='overflow-y-scroll max-h-auto'>
      {newsData && newsData.length && newsData.map((article, index) => (
        <div key={index}>
          <div className='m-3 text-sm text-white font-bold'>{article.title}</div>
          <div className='m-3 text-sm text-gray-400'>{article.summary}</div>
        </div>
      ))}
    </div>
  );
};

export default NewsBar;
