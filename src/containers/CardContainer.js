import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';

const useStyles = makeStyles((theme) => {
  return {
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    root: {
      width: '70%',
      marginTop: '50px',
    },
  };
});

// Main Container which loads the application
// Application is split into two top container and bottom container
export default function CardContainer() {
  const classes = useStyles();

  return (
    <Box className={classes.box} component="div">
      <Card className={classes.root}>
        <TopContainer />
        <BottomContainer />
      </Card>
    </Box>
  );
}
