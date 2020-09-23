/* eslint react/prop-types: 0 */
//TODO props validation

import React from "react";

const PersonForm = ({ newName, newNumber, persons, setNewName, setNewNumber, setPersons }) => {
  const addPerson = (event) => {
    event.preventDefault();

    const names = persons.map(person => person.name);

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(
        {
          name: newName,
          number: newNumber
        }
      ));
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={event => setNewName(event.target.value)} value={newName} />
      </div>
      <div>
        number: <input onChange={event => setNewNumber(event.target.value)} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;