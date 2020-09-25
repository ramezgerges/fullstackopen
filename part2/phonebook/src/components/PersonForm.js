/* eslint react/prop-types: 0 */
//TODO props validation

import React from "react";

const PersonForm = ({ newName, newNumber, persons, setNewName, setNewNumber, setPersons, create, update }) => {
  const addPerson = (event) => {
    event.preventDefault();

    const names = persons.map(person => person.name);

    if (names.includes(newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        const person = persons.filter(person => person.name === newName)[0];
        update(person.id, {
          name: newName,
          number: newNumber
        }).then((data) => setPersons(persons.map(p => p.id === person.id? data : p)))
          .catch(error => {
            console.log(error);
            alert(`Error: couldn't update ${newName}`);
          });
      }
    } else {
      create({
        name: newName,
        number: newNumber
      }).then((data) => setPersons(persons.concat(data)))
        .catch(error => {
          console.log(error);
          alert(`Error: couldn't add ${newName}`);
        });
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