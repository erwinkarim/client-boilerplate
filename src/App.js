import React from 'react';

import Routes from './Routes';
import './App.css';
import TopNav from './components/TopNav';
import configureAmp from './libs/amplify';

configureAmp();

const App = () => (
  <div className="App">
    <TopNav />
    <Routes />
  </div>
);

export default App;
