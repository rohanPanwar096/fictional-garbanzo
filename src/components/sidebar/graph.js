import React,{useState,useEffect} from 'react'
import { Chart } from 'react-charts'
 
export default function Graph({emissionData,selectedCountry,selectedParam}) {
  const [dataSet, setDataSet] = useState([]);
  let graphData = emissionData.filter((data) => data["country_or_area"] === selectedCountry && data["category"] === selectedParam);

  if(selectedCountry === "India") {
    graphData = emissionData.filter((data) => data["country_or_area"] === "Australia" && data["category"] === selectedParam);
  }

//console.log("Graph",graphData);

  let graphVar = [];

  for(let i in graphData) {
    //graphVar.push(graphData[i]['year'],graphData[i]['value']);
    graphVar.push({
      x: graphData[i].year,
      y: graphData[i].value,
  });
  }

  useEffect(() => {
    setDataSet([
      {
        label: 'Series 1',
        data: graphVar
      }
    ])
   // console.log("GRaph var",graphVar)
  },[selectedCountry,selectedParam])

  //console.log("Graph data",graphVar)
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
 
  return (
    <div
      style={{
        width: '400px',
        height: '300px'
      }}
      className="chart"
    >
      <p>Example Graph</p>
      <Chart data={dataSet} axes={axes} />
    </div>
  )
}