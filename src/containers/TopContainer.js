/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import Stocks from '../features/stocks/Stocks';
import { getStocks } from '../features/stocks/stocksSlice';
import { fetchStocksAsync } from '../features/stocks/asyncThunkOps';

const useStyles = makeStyles((theme) => {
  return {
    topContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column',
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    root: {
      width: '70%',
      marginTop: '50px',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      fontFamily: theme.typography.fontFamily,
    },
    pos: {
      marginBottom: 12,
    },
  };
});

export default function TopContainer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStocksAsync());
  }, []);

  const selectedStocks = useSelector(getStocks);

  return (
    <CardContent className={classes.topContainer}>
      {selectedStocks.length ? (
        <Stocks selectedStocks={selectedStocks} />
      ) : (
        <CardContent className={classes.loadingContainer}>
          <CircularProgress />
          <p>Please wait </p>
        </CardContent>
      )}
    </CardContent>
  );
}
