import React from 'react';
import './App.css';
import ChoresList from './ChoresList';
import AddChore from './AddChore';

function App() {
  return (
    <div className="App">
      <h1>ChoreTracker</h1>
      <ChoresList />
      <AddChore />
    </div>
  );
}

export default App;