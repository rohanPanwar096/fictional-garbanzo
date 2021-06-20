import React,{useEffect, useState} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

export default function ParameterSelect({data,paramSelect}) {
    //Write logic to render all countries as dropdown options
    const [initialVal, setVal] = useState("CO2")
    const [options,setOptions] = useState([]);

    const handleChange = (e) => {
        setVal(e.value)
    }
   // const defaultOption = options[0];
    //console.log("Selected",initialVal)
    useEffect(() => {
        paramSelect(initialVal)
    },[initialVal])

    useEffect(() => {
        let newArr= [];
        let uniqueObject = {};
        let param;

        for(let i in data) {
            //console.log("Emission data",emissionData[i]["country_or_area"])
            param = data[i]["category"];
            uniqueObject[param] = data[i];
        }

        for(let j in uniqueObject) {
            //console.log("UNique Country",uniqueObject[j])
            newArr.push(uniqueObject[j]["category"]);
        }
        setOptions(newArr)
    },[])
    
    return(
        <div className="parameter-select">
            <Dropdown options={options} value={initialVal} placeholder="Select an option" onChange={(e) => handleChange(e)}/>
        </div>
    )
}