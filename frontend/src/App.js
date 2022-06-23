import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends Component {


  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <Home />
      </ThemeProvider>
    );
  }
}

export default App;
