/* eslint react/prop-types: 0 */
//TODO props validation

import React, { useState, useEffect } from "react";

import FilteredPersons from "./components/FilteredPersons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import { getAll, create, update, deleteObject } from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [ nameFilter, setNameFilter ] = useState("");
  const [ notificationMessage, setNotificationMessage ] = useState(null);

  useEffect(() => {
    getAll()
      .then(data => setPersons(data))
      .catch(error => {
        console.log(error);
        setNotificationMessage({
          text: "Error: couldn't get the list of phonebook names from server.",
          type: "error"
        });
        setTimeout(() => setNotificationMessage(null), 5000);
      });
  }, []);

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
        create={create}
        update={update}
        setNotificationMessage={setNotificationMessage}
      />

      <br/>
      <Notification message={notificationMessage} />

      <h3>Numbers</h3>
      <FilteredPersons
        filterName={nameFilter}
        persons={persons}
        setPersons={setPersons}
        deleteObject={deleteObject}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  );
};

export default App;