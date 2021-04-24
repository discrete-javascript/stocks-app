import { configureStore } from '@reduxjs/toolkit';
import stocksCollection from '../features/stocks/stocksSlice';

export const store = configureStore({
  reducer: {
    stocksCollection,
  },
});
