/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { useDispatch } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import ListboxComponent from './ListboxComponent';
import { setResetChart, setFilterDates } from './stocksSlice';
import DatePickers from '../datepicker/DatePicker';
import { fetchTimeSeriesAsync } from './stocksThunkOps';

const useStyles = makeStyles((theme) => {
  return {
    button: {
      marginLeft: theme.spacing(2),
    },
  };
});

function Stocks({ selectedStocks }) {
  const classes = useStyles();
  const [value, setValue] = useState([]);
  const [date, setDate] = useState({
    from: '',
    to: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!value.length) {
      dispatch(setResetChart(true));
    }
  }, [value]);

  const handleAutoCompleteChange = (event, newValue) => {
    setValue([...newValue]);
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
  });

  const handleClick = () => {
    dispatch(fetchTimeSeriesAsync(value, date));
  };

  const handleDate = (value, dateOf) => {
    setDate({
      ...date,
      [dateOf]: value,
    });
  };

  useEffect(() => {
    if (date.from !== '' && date.to !== '') {
      dispatch(setFilterDates(date));
    }
  }, [date]);

  return (
    <>
      <Autocomplete
        multiple
        id="fixed-tags"
        value={value}
        onChange={handleAutoCompleteChange}
        options={selectedStocks}
        getOptionLabel={(option) => {
          return option.symbol;
        }}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option.symbol} {...getTagProps({ index })} />
          ))
        }
        getOptionDisabled={() => (value.length === 3 ? true : false)}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label="Symbols" variant="outlined" />
        )}
        limitTags={2}
        filterOptions={filterOptions}
        ListboxComponent={ListboxComponent}
      />
      <DatePickers label="From" value={date.from} onChange={handleDate} />
      <DatePickers label="To" value={date.to} onChange={handleDate} />
      <Button
        className={classes.button}
        onClick={handleClick}
        disabled={!(date.from !== '' && date.to !== '')}
      >
        Generate Chart
      </Button>
    </>
  );
}

export default React.memo(Stocks);
Stocks.propTypes = {
  selectedStocks: PropTypes.array,
};
