/* eslint react/prop-types: 0 */
//TODO props validation

import React, { useState, useEffect } from "react";
import axios from "axios";

import FilteredCountries from "./components/FilteredCountries";
import Filter from "./components/Filter";

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ nameFilter, setNameFilter ] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response => setCountries(response.data)));
  }, []);

  return (
    <div>
      <Filter
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      />
      <FilteredCountries
        nameFilter={nameFilter}
        countries={countries}
        setNameFilter={setNameFilter}
      />
    </div>
  );
};

export default App;