/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import { getStocks } from './stocksSlice';

export default function FixedTags() {
  const [value, setValue] = React.useState([]);
  const selectedStocks = useSelector(getStocks);

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
  });

  return selectedStocks.length ? (
    <Autocomplete
      multiple
      id="fixed-tags"
      value={value}
      onChange={(event, newValue) => {
        setValue([...newValue]);
      }}
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
      getOptionDisabled={() => (value.length === 2 ? true : false)}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Symbols" variant="outlined" />
      )}
      limitTags={2}
      filterOptions={filterOptions}
    />
  ) : (
    <>
      <CircularProgress />
      <p>Please wait </p>
    </>
  );
}
