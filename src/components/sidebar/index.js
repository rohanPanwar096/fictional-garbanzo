import React,{useEffect,useState} from 'react';
import Graph from './graph';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import emissionData from '../../data/data.json'

export default function Sidebar({countryGraph,setCountryGraph}) {
  // const [selectedCountry,setSelectedCountry] = useState("Australia");
  const [selectedParam,setSelectedParam] = useState("CO2");
  return (
    <div className="sidebar">
      <div className="dropdowns">
        <CountrySelect selectedCountry={countryGraph} data={emissionData} countrySelect={setCountryGraph}/>
        <ParameterSelect data={emissionData} paramSelect={setSelectedParam}/>
      </div>
      <Graph emissionData={emissionData} selectedCountry={countryGraph} selectedParam={selectedParam}/>
    </div>
  );
}
