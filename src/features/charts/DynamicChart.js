import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { CardContent } from '@material-ui/core';

import { getSeriesOptions } from '../stocks/stocksSlice';

const StockCandleChart = () => {
  const seriesOptions = useSelector(getSeriesOptions);

  const options = {
    rangeSelector: {
      enabled: false,
    },

    title: {
      text: 'Historical Data',
    },

    yAxis: [
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'OHLC',
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'Volume',
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2,
      },
    ],

    tooltip: {
      split: true,
    },

    series: seriesOptions,
  };

  return (
    <CardContent>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        />
      </div>
    </CardContent>
  );
};

export default StockCandleChart;
