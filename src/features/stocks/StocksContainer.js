import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import Stocks from './Stocks';
import {
  fetchSelectedStockCandleAsync,
  fetchStocksAsync,
  getStocks,
} from './stocksSlice';
import Charts from '../charts/ChartsContainer';

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

export default function StocksContainer() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStocksAsync());
  }, []);

  const selectedStocks = useSelector(getStocks);

  return (
    <Box className={classes.box} component="div">
      <Card className={classes.root}>
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
        <CardContent>
          <Charts />
        </CardContent>
      </Card>
    </Box>
  );
}
