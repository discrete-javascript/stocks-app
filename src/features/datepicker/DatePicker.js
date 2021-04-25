import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers({ label, onChange, value }) {
  const classes = useStyles();

  const handleChange = (e) => {
    onChange(e.target.value, label.toLowerCase());
  };
  // Setting up defautl value
  //   const defaultValue =
  //     label.toLowerCase() === 'from'
  //       ? moment(moment().subtract(1, 'y')._d).format('DD/MM/YYYY')
  //       : moment().format('DD/MM/YYYY');

  return (
    <TextField
      id="date"
      label={label}
      type="date"
      value={value}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleChange}
    />
  );
}
