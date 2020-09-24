/* eslint react/prop-types: 0 */
//TODO props validation

import React, {useEffect, useState} from "react";
import axios from "axios";

const FilteredCountries = ({ countries, nameFilter, setNameFilter }) => {
  countries = countries.filter(country => country.name.toLowerCase().includes(nameFilter.toLowerCase()));
  const [ weather, setWeather ] = useState({});

  const degreeToDirection = (degree) => {
    const val = Math.floor((degree / 22.5) + 0.5);
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  };

  console.log("rerender");

  useEffect(() => {
    if (countries.length === 1) {
      console.log("useEffect");
      const country = countries[0];
      const api_key = process.env.REACT_APP_API_KEY;
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
        .then(response => {
          const data = response.data;
          if (data.cod === 200) {
            setWeather({
              temp: data.main.temp, //F to C
              description: data.weather[0].description,
              windSpeed: data.wind.speed * 3.6, // meter/s to km/hr
              windDirection: degreeToDirection(data.wind.deg)
            });
          } else {
            setWeather({});
          }
        });
    }
  }, [countries.length]);

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    if ("temp" in weather) {
      return (
        <div>
          <h2>{country.name}</h2>
          capital {country.capital}
          <br/>
          population {country.population}

          <h3>languages</h3>
          <ul>
            {country.languages.map(language => <li key={country.name + language.name}>{language.name}</li>)}
          </ul>

          <img src={country.flag} alt={`{country.name}'s flag`} width="130" height="130"/>

          <h3><b>Weather in {country.capital}</b></h3>
          <h4>{weather.description}</h4>
          <b>temperature:</b> {weather.temp} Celsius
          <br/>
          <b>wind:</b> {weather.windSpeed} km/h direction {weather.windDirection}
        </div>
      );
    } else {
      return (
        <div>
          <h2>{country.name}</h2>
          capital {country.capital}
          <br/>
          population {country.population}

          <h3>languages</h3>
          <ul>
            {country.languages.map(language => <li key={country.name + language.name}>{language.name}</li>)}
          </ul>

          <img src={country.flag} alt={`{country.name}'s flag`} width="130" height="130"/>
        </div>
      );
    }
  } else if (countries.length === 0) {
    return (
      <div>
        no country matches the filter provided
      </div>
    );
  } else { //between 2 and 10
    return (
      <div>
        {countries.map(country => {
          return (
            <p key={country.name}>
              {country.name} <button onClick={() => setNameFilter(country.name)}>show</button>
            </p>
          );
        })}
      </div>
    );
  }
};

export default FilteredCountries;