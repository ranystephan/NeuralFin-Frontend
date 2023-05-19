import { useState, useEffect } from 'react';

type NewsData = {
  title: string;
  summary: string;
  sentiment: string;
};

type NewsBarProps = {
  symbol: string;
};

const NewsBar = (props: NewsBarProps) => {
  const [newsData, setNewsData] = useState([] as NewsData[]);
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  const fetchNewsData = async () => {
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${props.symbol}&sort=RELEVANCE&apikey=${apiKey}`);
      const data = await response.json();
      const articles = data.feed.map((article: { title: any; summary: any; overall_sentiment_label: any}) => ({
        title: article.title,
        summary: article.summary,
        sentiment: article.overall_sentiment_label,
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
    <div className='overflow-y-scroll max-h-auto scrollbar-hide'>
      {newsData && newsData.length && newsData.map((article, index) => (
        <div key={index} className='flex flex-col hover:bg-gray-800 rounded-lg'>
          <div className='m-3 text-md text-white font-bold '>{article.title}</div>
          <div className='m-3 text-md text-white'>{article.summary}</div>
          <div className='m-3 text-md text-red-400 flex justify-end'>
            <span className='bg-gray-800 border border-white rounded-full px-2 py-1'>{article.sentiment}</span>
          </div>

        </div>
      ))}
    </div>
  );
};

export default NewsBar;
