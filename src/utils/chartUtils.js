import { FILTERS } from './constants';

const filterOut = (filter, payload) => {
  const timeSeries = [];
  if (payload?.t) {
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
    } else if (filter === FILTERS.CLOSE) {
      for (let i = 0; i < payload.t.length; i++) {
        timeSeries.push([payload.t[i], payload.c[i]]);
      }
    } else if (filter === FILTERS.HIGH) {
      for (let i = 0; i < payload.t.length; i++) {
        timeSeries.push([payload.t[i], payload.h[i]]);
      }
    } else if (filter === FILTERS.LOW) {
      for (let i = 0; i < payload.t.length; i++) {
        timeSeries.push([payload.t[i], payload.l[i]]);
      }
    }
  }
  return timeSeries;
};

export const createTimeSeries = (payload = [], filter = FILTERS.NO_FILTER) => {
  const seriesOptions = [];
  if (payload && payload.length) {
    const combinedData = payload
      .map((i) => ({
        data: filterOut(filter, i.value.data),
        name: i.value.name,
      }))
      .map((i) => ({
        type: filter === FILTERS.NO_FILTER ? 'candlestick' : 'line',
        data: i.data,
        name: i.name,
      }));
    return [...combinedData, ...createVolumeData(payload)];
  }
  return seriesOptions;
};

const volumeLogic = (payload = []) => {
  const volumeData = [];
  if (payload && payload.length && payload?.t) {
    for (let i = 0; i < payload.t.length; i++) {
      volumeData.push([payload.t[i], payload.v[i]]);
    }
  }
  return volumeData;
};

export const createVolumeData = (payload = []) => {
  if (payload && payload.length) {
    const combinedData = payload
      .map((i) => ({
        data: volumeLogic(i.value.data),
      }))
      .map((i) => ({
        type: 'column',
        data: i.data,
        yAxis: 1,
        name: 'Volume',
      }));
    return combinedData;
  }
  return [{ type: 'column', name: 'Volume', data: [], yAxis: 1 }];
};
