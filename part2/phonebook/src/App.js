/* eslint react/prop-types: 0 */
//TODO props validation

import React, { useState, useEffect } from "react";
import axios from "axios";

import FilteredPersons from "./components/FilteredPersons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [ nameFilter, setNameFilter ] = useState("");

  useEffect(() =>
    axios
      .get("http://localhost:3001/persons")
      .then((response => setPersons(response.data)))
  , []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameFilter={nameFilter} setNameFilter={setNameFilter}
      />

      <h3>add a new</h3>
      <PersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
      />

      <h3>Numbers</h3>
      <FilteredPersons
        filterName={nameFilter} persons={persons}
      />
    </div>
  );
};

export default App;