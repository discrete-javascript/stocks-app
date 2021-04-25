import { FILTERS } from './constants';

export const createTimeSeries = (payload = [], filter = FILTERS.NO_FILTER) => {
  const timeSeries = [];
  if (payload) {
    if (filter === FILTERS.NO_FILTER) {
      for (let i = 0; i < payload.t.length; i++) {
        timeSeries.push([
          payload.t[i],
          payload.o[i],
          payload.h[i],
          payload.l[i],
          payload.c[i],
        ]);
      }
      return timeSeries;
    } else if (filter === FILTERS.OPEN) {
      for (let i = 0; i < payload.t.length; i++) {
        timeSeries.push([payload.t[i], payload.o[i]]);
      }
      return timeSeries;
    } else if (filter === FILTERS.CLOSE) {
      for (let i = 0; i < payload.t.length; i++) {
        timeSeries.push([payload.t[i], payload.c[i]]);
      }
      return timeSeries;
    } else if (filter === FILTERS.HIGH) {
      for (let i = 0; i < payload.t.length; i++) {
        timeSeries.push([payload.t[i], payload.h[i]]);
      }
      return timeSeries;
    } else if (filter === FILTERS.LOW) {
      for (let i = 0; i < payload.t.length; i++) {
        timeSeries.push([payload.t[i], payload.l[i]]);
      }
      return timeSeries;
    }
  }
  return timeSeries;
};

export const createVolumeData = (payload = []) => {
  const volumData = [];
  if (payload) {
    for (let i = 0; i < payload.t.length; i++) {
      volumData.push([payload.t[i], payload.v[i]]);
    }
    return volumData;
  }
  return volumData;
};

export const createSeriesOptions = (
  { timeSeries, volumeData } = { timeSeries: [], volumeData: [] }
) => {
  const groupingUnits = [
    [
      'week', // unit name
      [1], // allowed multiples
    ],
    ['month', [1, 2, 3, 4, 6]],
  ];

  return (
    {
      name: 'AAPL',
      data: timeSeries,
      dataGrouping: {
        units: groupingUnits,
      },
    },
    {
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
    {
      type: 'column',
      name: 'Volume',
      data: volumeData,
      yAxis: 1,
      dataGrouping: {
        units: groupingUnits,
      },
    }
  );
};
