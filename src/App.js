import React from 'react';
import StocksContainer from './features/stocks/StocksContainer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <h3>Stocks Management</h3>
        <StocksContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
