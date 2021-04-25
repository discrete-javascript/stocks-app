import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { BASE_URL, TOKEN } from '../../utils/constants';
import { fetchStocksAPI } from './stocksAPI';

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(fetchStocks(10))`. This
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

async function getFetchMaps(stocks, from, to) {
  try {
    var data = await Promise.allSettled(
      stocks.map((i) =>
        fetch(
          `${BASE_URL}/candle?symbol=${i.symbol}&resolution=1&from=${from}&to=${to}&token=${TOKEN}`
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

export const fetchTimeSeriesAsync = createAsyncThunk(
  'stocks/fetchTimeSeriesData',
  async (stocks, date) => {
    if (stocks.length) {
      const { from, to } = date;

      const response = await getFetchMaps(
        stocks,
        moment(from).unix(),
        moment(to).unix()
      );
      return response.filter((i) => i.status === 'fulfilled');
    }
    return [];
  }
);
