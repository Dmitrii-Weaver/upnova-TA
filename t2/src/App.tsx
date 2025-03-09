import React from 'react';
import logo from './logo.svg';
import './App.css';
import ScrollCont from './components/ScrollCont';

function App() {
  return (
    <div className="App" style={{ fontSize: "24px", margin: "10px 0", fontWeight: "bold" }}>
      <h2>Very cool list of items!</h2>
      <ScrollCont/>
    </div>
  );
}

export default App;
