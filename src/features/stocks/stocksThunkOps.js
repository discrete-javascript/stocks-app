import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { BASE_URL, TOKEN } from '../../utils/constants';
import { fetchStocksAPI } from './stocksAPI';

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchStocksAsync(stocks))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchStocksAsync = createAsyncThunk(
  'stocks/fetchUSStocks',
  async () => {
    const endpoint = `${BASE_URL}/symbol?exchange=US&token=${TOKEN}`;
    const response = await fetchStocksAPI(endpoint);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

/**
 * Summary: Dynamically calling the fetch methods by allsetted because we will be needing the methods to be called successively
 *
 * @param {array}   stocks stocks which is to called to call candlestick api.
 * @param {string}   from  from date as unix timestamp for the api
 * @param {string}   to   to date as unix timestamp for the api
 *
 * @return data from the promise allsetteled.
 */
async function getFetchMaps(stocks, from, to) {
  try {
    var data = await Promise.allSettled(
      stocks.map((i) =>
        fetch(
          `${BASE_URL}/candle?symbol=${i.symbol}&resolution=D&from=${from}&to=${to}&token=${TOKEN}`
        )
          .then((response) => response.json())
          .then((data) => ({
            data,
            name: i.symbol,
          }))
      )
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchTimeSeriesAsync(stocks, date))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchTimeSeriesAsync = createAsyncThunk(
  'stocks/fetchTimeSeriesData',
  async (data) => {
    const { value: stocks, date } = data;
    if (stocks.length) {
      const { from, to } = date;
      // getFetchMaps is the method above which calls the promise.allsettled
      const response = await getFetchMaps(
        stocks,
        moment(from).unix(),
        moment(to).unix()
      );
      // returns only the fulfilled promise
      return response.filter((i) => i.status === 'fulfilled');
    }
    return [];
  }
);
