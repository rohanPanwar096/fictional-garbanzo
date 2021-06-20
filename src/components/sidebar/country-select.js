import React,{useState,useEffect} from 'react'
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

export default function CountrySelect({data,countrySelect, selectedCountry}) {
    //Write logic to render all countries as dropdown options
   // const [initialCountry, setCountry] = useState("Australia");
    const [options,setOptions] = useState([]);

    
  if(selectedCountry === "India") {
    selectedCountry = "Australia";
  }

    const handleChange = (e) => {
        countrySelect(e.value);
    }

    //console.log("selected",initialCountry)

    useEffect(() => {
        countrySelect(selectedCountry);
    },[selectedCountry])
    

    useEffect(() => {
        let newArr= [];
        let uniqueObject = {};
        let country;
        for(let i in data) {
            //console.log("Emission data",emissionData[i]["country_or_area"])
            country = data[i]["country_or_area"];
            uniqueObject[country] = data[i];
        }

        for(let j in uniqueObject) {
            //console.log("UNique Country",uniqueObject[j])
            newArr.push(uniqueObject[j]["country_or_area"]);
        }
        //console.log("Options",newArr)
        setOptions(newArr)
    },[])
   //const defaultOption = options[0];

    return(
        <div className="country-select">
            <Dropdown options={options}  placeholder="Select an option" value={selectedCountry} onChange={handleChange}/>
        </div>
    )
}