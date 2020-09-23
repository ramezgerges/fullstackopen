/* eslint react/prop-types: 0 */
//TODO props validation

import React, { useState } from "react";

import FilteredPersons from "./components/FilteredComponents";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [ nameFilter, setNameFilter ] = useState("");

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