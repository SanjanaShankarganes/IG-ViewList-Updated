import React from 'react';
import TableComponent from './component/TableComponent'; 
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header className="App-header p-3 text-center">
        <h1 className="h1">Idol Immersion Records</h1>
      </header>
      <TableComponent />
    </div>
  );
}

export default App;
