import { FILTERS } from './constants';

/**
 * Summary: Filterout is used in the create data used in series options
 *
 * @param {string}   filter      FILTERS from the constants.
 * @param {object}   payload     contains open, close, high, low, time as array of values.
 * this is payload {c: [], t: [], h: [], l: [], o: [],}
 *
 * @return {array} timeSeries data array.
 */
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

/**
 * Summary: To create the series options for the DynamicChart Component
 *
 * @param {object} payload this is payload which we got the allsetted promise
 * [value: { data: {c: [], t: [], h: [], l: [], o: [],}}, name: 'symbol']   .
 * @param {string} filter     contains open, close, high, low, time as array of values.
 *
 * @return {array} series options as an array.
 */
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

/**
 * Summary: To create volumes for the DynamicChart used
 * in the createVolumeData for creating dynamic volumes
 *
 * @param {object}   payload     contains time, volume as array of values
 * this is payload {t: [], v: []}
 * which correlates with candlestick || line chart which got created in the above function
 * @return {array} Volume data.
 */
const volumeLogic = (payload = []) => {
  const volumeData = [];
  if (payload && payload?.t) {
    for (let i = 0; i < payload.t.length; i++) {
      volumeData.push([payload.t[i], payload.v[i]]);
    }
  }
  return volumeData;
};

/**
 * Summary: Creates volume data for the createTimeSeries method in the return value
 *
 * @param {object}   payload     payload this is payload which we got the allsetted promise
 * [value: { data: {t: [], v: []}}, name: 'symbol']
 *
 * @return {array} gives the volume data for which is used in createTimeSeries method.
 */
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
