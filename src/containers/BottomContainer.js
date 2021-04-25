import React from 'react';
import { useSelector } from 'react-redux';
import { CardContent } from '@material-ui/core';

import {
  getIsChartLoaded,
  getResetChart,
} from '../features/stocks/stocksSlice';
import StockCandleChart from '../features/charts/DynamicChart';
import FilterButtons from '../features/filterbuttons/FilterButtons';

const BottomContainer = () => {
  const isChartLoaded = useSelector(getIsChartLoaded);
  const resetChart = useSelector(getResetChart);

  return (
    <CardContent>
      {isChartLoaded && !resetChart ? (
        <>
          <FilterButtons />
          <StockCandleChart />
        </>
      ) : null}
    </CardContent>
  );
};

export default BottomContainer;
