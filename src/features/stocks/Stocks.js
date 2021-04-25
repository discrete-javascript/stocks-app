import React, { useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { useDispatch } from 'react-redux';
import ListboxComponent from './ListboxComponent';
import {
  fetchTimeSeriesAsync,
  selectStocks,
  setResetChart,
} from './stocksSlice';
import { Button, makeStyles } from '@material-ui/core';

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

  const dispatch = useDispatch();

  useEffect(() => {
    if (!value.length) {
      dispatch(setResetChart(true));
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue([...newValue]);
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
  });

  const handleClick = () => {
    dispatch(fetchTimeSeriesAsync(value));
  };

  return (
    <>
      <Autocomplete
        multiple
        id="fixed-tags"
        value={value}
        onChange={handleChange}
        options={selectedStocks}
        getOptionLabel={(option) => {
          console.log(value);
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
      <Button className={classes.button} onClick={handleClick}>
        Generate Chart
      </Button>
    </>
  );
}

export default React.memo(Stocks);
