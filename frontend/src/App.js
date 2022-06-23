import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends Component {


  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    );
  }
}

export default App;
