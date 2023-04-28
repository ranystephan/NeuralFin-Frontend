'use client'

import { useEffect, useState } from 'react';
import './styles/globals.css';

const styles = {


}


const InfoPage = () => {


  return (
    <>
      <div className=' font-extrabold text-2xl text-white'>Info</div>
      <div className='text-white'>
        In this section, we will discuss the methodology for implementing the historical simulation approach to calculate the Value at Risk (VaR) for our portfolio. The historical simulation approach is a non-parametric method that relies on the historical distribution of asset returns to estimate potential future losses. This approach is widely used in practice due to its simplicity and the fact that it does not require any assumptions about the underlying return distribution. The following steps outline the methodology for our analysis:

        1. 	Obtain historical data: We have collected daily closing prices for DJIA, FTSE 100, CAC 40, and Nikkei 225 indices over the past 500 trading days. This data will serve as the basis for our historical simulation.
        2.	Calculate daily returns: For each index, we will calculate the daily percentage returns by taking the natural logarithm of the ratio of consecutive closing prices. This will provide us with a time series of daily returns for each index.
        3.	Construct the portfolio: In order to calculate the VaR for a portfolio, we need to determine the portfolio weights for each index. We will assume an equal-weighted portfolio, meaning that each index will have a weight of 25%. We will then calculate the daily portfolio returns by multiplying the daily returns of each index by their respective weights and summing the results.
        4.	Simulate historical scenarios: Using the historical daily portfolio returns, we will create a set of scenarios representing potential future outcomes. For each day in our historical dataset, we will shift the entire return series forward by one day and calculate the 10-day portfolio return. This will result in a set of 10-day returns representing hypothetical future scenarios based on the observed historical data.
        5.	Calculate the 99% VaR: To estimate the 10-day 99% VaR, we will sort the simulated 10-day returns in ascending order and identify the value corresponding to the 1% quantile. This value represents the maximum loss that the portfolio is expected to incur over a 10-day period with a 99% confidence level.
        By following this methodology, we can estimate the 10-day 99% VaR for our portfolio using the historical simulation approach.


        Portfolio Construction
        In this section, we will discuss the process of constructing the portfolio using the collected data. The objective is to create a diversified portfolio that will allow us to calculate the 10-day 99% VaR using the historical simulation approach.
        To construct the portfolio, we will follow these steps:
        1.	Assigning Portfolio Weights: First, we will assign weights to each of the four indices in our portfolio. The weights represent the proportion of the total portfolio value that is invested in each index. For this project, we will assume equal weighting, meaning that 25% of the portfolio value is invested in each index. This decision is based on the assumption that equal weighting provides a reasonable level of diversification and reduces the impact of individual index fluctuations on the overall portfolio value.
        2.	Calculating Portfolio Returns: Next, we will calculate the daily returns for each index using the collected data. Daily returns are calculated by taking the percentage change in the index value from one day to the next. To compute the daily returns, we can use the following formula:

        Daily Return = (Index Value at Day t - Index Value at Day t-1) / Index Value at Day t-1

        After calculating the daily returns for each index, we will multiply them by their respective portfolio weights to obtain the weighted daily returns.
        3.	Aggregating Weighted Returns: To calculate the overall daily return of the portfolio, we will sum up the weighted daily returns of each index. This will provide us with the daily return of the portfolio, which will be used later in the historical simulation approach to calculate the 10-day 99% VaR.
        4.	Creating a Portfolio Time Series: Finally, we will create a time series of the portfolio's daily returns, starting from the earliest date in our dataset and ending with the most recent date. This time series will be used as input for the historical simulation approach to calculate the 10-day 99% VaR.

        In summary, the portfolio construction process involves assigning weights to each index, calculating the daily returns for each index, aggregating the weighted daily returns to obtain the overall daily return of the portfolio, and creating a time series of the portfolio's daily returns. This diversified portfolio will allow us to calculate the 10-day 99% VaR using the historical simulation approach, as described in the following section.

      </div>
    </>
  );
};

export default InfoPage;
