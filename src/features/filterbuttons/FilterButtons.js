import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FILTERS } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredBy, setFilteredBy } from '../stocks/stocksSlice';

export default function FilterButtons() {
  const filteredBy = useSelector(getFilteredBy);

  const dispatch = useDispatch();

  const handleFilter = (event, toggle) => {
    dispatch(setFilteredBy(toggle));
  };

  return (
    <ToggleButtonGroup
      value={filteredBy}
      exclusive
      onChange={handleFilter}
      aria-label="text alignment"
    >
      <ToggleButton value={FILTERS.OPEN} aria-label={FILTERS.OPEN}>
        Open
      </ToggleButton>
      <ToggleButton value={FILTERS.CLOSE} aria-label={FILTERS.CLOSE}>
        Close
      </ToggleButton>
      <ToggleButton value={FILTERS.HIGH} aria-label={FILTERS.HIGH}>
        High
      </ToggleButton>
      <ToggleButton value={FILTERS.LOW} aria-label={FILTERS.LOW}>
        Low
      </ToggleButton>
      <ToggleButton value={FILTERS.NO_FILTER} aria-label={FILTERS.NO_FILTER}>
        All
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
