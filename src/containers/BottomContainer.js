import React from 'react';
import { useSelector } from 'react-redux';
import { CardContent } from '@material-ui/core';

import {
  getIsChartLoaded,
  getResetChart,
} from '../features/stocks/stocksSlice';
import StockCandleChart from '../features/charts/DynamicChart';
import FilterButtons from '../features/filterbuttons/FilterButtons';

// Renders isChartLoaded && !resetChart is true
// then it loads filterbuttons and chart for display
const BottomContainer = () => {
  // finds if charts is loaded from the redux store
  const isChartLoaded = useSelector(getIsChartLoaded);
  // check chart data is reset from the redux store
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
