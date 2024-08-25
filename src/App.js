import React from 'react';
import TableComponent from './component/TableComponent'; 
import './App.css'; 
import img from './tn police logo.png';
import banner from './banner.jpeg';

function App() {
  return (
    <div className="App">
     <header className="App-header">
      <div className='d-flex mx-4 align-items-center'>
       <img src={img} alt="tn police logo" id='policeLogo'></img>
       <p className='h1 mx-4'> District Police</p></div>
       <img src={banner} id="nav_banner"></img>
      </header>
      <div className='body'>
      <h1 className="h1 text-center mt-4">( IG view ) Idol Immersion Records</h1>
      <TableComponent /></div>
    </div>
  );
}

export default App;
