// var data=[40,20,100,10,3,71,11];
// const sortData=(data)=>{
// const sortedData=[...data]
// return sortedData.sort((a,b)=> (a>b ? 1:-1));
// }
// var sortedData2=sortData(data);
// console.log(sortedData2);
import React from "react";
import {Circle,Popup} from "react-leaflet";
import numeral from "numeral";
const casesTypeColors = {
  cases: {
    multiplier: 800,
    option: { color:"#cc1034", fillColor: "#cc1034" },
  },
  recovered: {
    multiplier: 1200,
    option: { color:"#7dd71d", fillColor: "#7dd71d" },
  },
  deaths: {
    multiplier: 2000,
    option: { color:"#ff6c47", fillColor: "#ff6c47" }
  },
};
export const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a.cases > b.cases) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
  };
  export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

  export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={casesTypeColors[casesType].option}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier/3
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
  