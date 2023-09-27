import logo from './logo.svg';
import './App.css';
import React from 'react';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          
        </p>
        <Routes />
      </header>
    </div>
  );
}

export default App;
