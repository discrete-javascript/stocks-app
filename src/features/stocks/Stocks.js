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
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
      '&:disabled': {
        backgroundColor: 'grey',
        color: theme.palette.common.white,
      },
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
      // called to reset the chart to load fresh data
      dispatch(setResetChart(true));
    }
  }, [value]);

  /**
   * Summary: Ha  ndles autocomplete changes and sets in the state
   *
   * Description. (use period)
   *
   * @param {object}   event      event from the autocomplete.
   * @param {object}   newValue   new value which get from the selection of autocomplete
   *
   * @return no return.
   */
  const handleAutoCompleteChange = (event, newValue) => {
    setValue([...newValue]);
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
  });

  /**
   * Summary: Calls api to load the specific stocks
   *
   * @param null no params
   *
   * @return no return.
   */
  const handleClick = () => {
    dispatch(fetchTimeSeriesAsync(value, date));
  };

  /**
   * Summary: Set the state for setDate
   *
   * Description. (use period)
   *
   * @param {string}   value   date from the date picker.
   * @param {string}   dateOf  from which datepicker is from or to
   *
   * @return no return.
   */
  const handleDate = (value, dateOf) => {
    setDate({
      ...date,
      [dateOf]: value,
    });
  };

  useEffect(() => {
    if (date.from !== '' && date.to !== '') {
      // To save the filter dates in redux store
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
