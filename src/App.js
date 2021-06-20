import './App.css';
import React,{useState,useEffect} from 'react';
import Map from './components/map';
import Sidebar from './components/sidebar';

function App() {
  const [countryGraph,setCountryGraph] = useState("Australia");
  
  return (
    <div className="App">
      <Sidebar countryGraph={countryGraph} setCountryGraph={setCountryGraph} />
      <Map setCountryGraph={setCountryGraph} />
    </div>
  );
}

export default App;
