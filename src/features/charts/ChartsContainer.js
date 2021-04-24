import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { getTimeSeriesData, getVolumeData } from '../stocks/stocksSlice';

const ChartsContainer = () => {
  const timeSeries = useSelector(getTimeSeriesData);
  const volumeData = useSelector(getVolumeData);
  const groupingUnits = [
    [
      'week', // unit name
      [1], // allowed multiples
    ],
    ['month', [1, 2, 3, 4, 6]],
  ];
  const options = {
    rangeSelector: {
      selected: 1,
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

    series: [
      {
        type: 'candlestick',
        name: 'AAPL',
        data: timeSeries,
        dataGrouping: {
          units: groupingUnits,
        },
      },
      {
        type: 'candlestick',
        name: 'GOOGL',
        data: timeSeries,
        dataGrouping: {
          units: groupingUnits,
        },
      },
      {
        type: 'column',
        name: 'Volume',
        data: volumeData,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits,
        },
      },
    ],
  };

  return (
    timeSeries.length && (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        />
      </div>
    )
  );
};

export default ChartsContainer;
