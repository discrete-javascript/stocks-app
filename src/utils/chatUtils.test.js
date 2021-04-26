import { createTimeSeries } from './chartUtils';
import { FILTERS } from './constants';

describe('test createTimeSeries', () => {
  it('test createTimeSeries empty', () => {
    const payload = [
      {
        status: 'fulfilled',
        value: {
          data: {
            s: 'no_data',
          },
          name: 'AAPL',
        },
      },
    ];

    const response = [
      { type: 'candlestick', data: [], name: 'AAPL' },
      { type: 'column', data: [], yAxis: 1, name: 'Volume' },
    ];
    expect(createTimeSeries(payload)).toEqual(response);
  });
  it('test createTimeSeries has value', () => {
    const payload = [
      {
        status: 'fulfilled',
        value: {
          data: {
            c: [217.68, 221.03, 219.89],
            h: [222.49, 221.5, 220.94],
            l: [217.19, 217.1402, 218.83],
            o: [221.03, 218.55, 220],
            s: 'ok',
            t: [1569297600, 1569384000, 1569470400],
            v: [33463820, 24018876, 20730608],
          },
          name: 'AAPL',
        },
      },
    ];

    const response = [
      {
        type: 'candlestick',
        data: [
          [1569297600, 221.03, 222.49, 217.19, 217.68],
          [1569384000, 218.55, 221.5, 217.1402, 221.03],
          [1569470400, 220, 220.94, 218.83, 219.89],
        ],
        name: 'AAPL',
      },
      { type: 'column', data: [], yAxis: 1, name: 'Volume' },
    ];
    expect(createTimeSeries(payload)).toEqual(response);
  });
  it('test createTimeSeries open', () => {
    const payload = [
      {
        status: 'fulfilled',
        value: {
          data: {
            c: [217.68, 221.03, 219.89],
            h: [222.49, 221.5, 220.94],
            l: [217.19, 217.1402, 218.83],
            o: [221.03, 218.55, 220],
            s: 'ok',
            t: [1569297600, 1569384000, 1569470400],
            v: [33463820, 24018876, 20730608],
          },
          name: 'AAPL',
        },
      },
    ];

    const response = [
      {
        type: 'line',
        data: [
          [1569297600, 221.03],
          [1569384000, 218.55],
          [1569470400, 220],
        ],
        name: 'AAPL',
      },
      { type: 'column', data: [], yAxis: 1, name: 'Volume' },
    ];
    expect(createTimeSeries(payload, FILTERS.OPEN)).toEqual(response);
  });
  it('test createTimeSeries close', () => {
    const payload = [
      {
        status: 'fulfilled',
        value: {
          data: {
            c: [217.68, 221.03, 219.89],
            h: [222.49, 221.5, 220.94],
            l: [217.19, 217.1402, 218.83],
            o: [221.03, 218.55, 220],
            s: 'ok',
            t: [1569297600, 1569384000, 1569470400],
            v: [33463820, 24018876, 20730608],
          },
          name: 'AAPL',
        },
      },
    ];

    const response = [
      {
        type: 'line',
        data: [
          [1569297600, 217.68],
          [1569384000, 221.03],
          [1569470400, 219.89],
        ],
        name: 'AAPL',
      },
      { type: 'column', data: [], yAxis: 1, name: 'Volume' },
    ];
    expect(createTimeSeries(payload, FILTERS.CLOSE)).toEqual(response);
  });
  it('test createTimeSeries high', () => {
    const payload = [
      {
        status: 'fulfilled',
        value: {
          data: {
            c: [217.68, 221.03, 219.89],
            h: [222.49, 221.5, 220.94],
            l: [217.19, 217.1402, 218.83],
            o: [221.03, 218.55, 220],
            s: 'ok',
            t: [1569297600, 1569384000, 1569470400],
            v: [33463820, 24018876, 20730608],
          },
          name: 'AAPL',
        },
      },
    ];

    const response = [
      {
        type: 'line',
        data: [
          [1569297600, 222.49],
          [1569384000, 221.5],
          [1569470400, 220.94],
        ],
        name: 'AAPL',
      },
      { type: 'column', data: [], yAxis: 1, name: 'Volume' },
    ];
    expect(createTimeSeries(payload, FILTERS.HIGH)).toEqual(response);
  });
  it('test createTimeSeries LOW', () => {
    const payload = [
      {
        status: 'fulfilled',
        value: {
          data: {
            c: [217.68, 221.03, 219.89],
            h: [222.49, 221.5, 220.94],
            l: [217.19, 217.1402, 218.83],
            o: [221.03, 218.55, 220],
            s: 'ok',
            t: [1569297600, 1569384000, 1569470400],
            v: [33463820, 24018876, 20730608],
          },
          name: 'AAPL',
        },
      },
    ];

    const response = [
      {
        type: 'line',
        data: [
          [1569297600, 217.19],
          [1569384000, 217.1402],
          [1569470400, 218.83],
        ],
        name: 'AAPL',
      },
      { type: 'column', data: [], yAxis: 1, name: 'Volume' },
    ];
    expect(createTimeSeries(payload, FILTERS.LOW)).toEqual(response);
  });
  it('test createTimeSeries no value', () => {
    const payload = [];

    const response = [];
    expect(createTimeSeries(payload)).toEqual(response);
  });
});
