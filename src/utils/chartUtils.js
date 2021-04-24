export const createTimeSeries = (payload = []) => {
  const timeSeries = [];
  if (payload) {
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
