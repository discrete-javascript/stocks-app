import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Stocks from './Stocks';
import { fetchSelectedStockCandleAsync, fetchStocksAsync } from './stocksSlice';
import { useDispatch } from 'react-redux';
import Charts from '../charts/ChartsContainer';

const useStyles = makeStyles((theme) => {
  return {
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
    dispatch(fetchSelectedStockCandleAsync());
  }, [dispatch]);

  return (
    <Box className={classes.box} component="div">
      <Card className={classes.root}>
        <CardContent>
          <Stocks />
        </CardContent>
        <CardContent>
          <Charts />
        </CardContent>
      </Card>
    </Box>
  );
}
