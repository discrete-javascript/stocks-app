import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import CardContainer from './containers/CardContainer';
import ErrorBoundary from './ErrorBoundary';

// Overridden fonts in the actual material ui theme by
// giving typography and fontFamily
// Have added respective fonts in the index.css in the body
export const theme = createMuiTheme({
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

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <h3>Stocks Management</h3>
          <CardContainer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
