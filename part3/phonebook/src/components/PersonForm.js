/* eslint react/prop-types: 0 */
//TODO props validation

import React from "react";

const PersonForm = ({ newName, newNumber, persons, setNewName, setNewNumber,
  setPersons, create, update, setNotificationMessage }) => {
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
        }).then((data) => {
          setPersons(persons.map(p => p.id === person.id? data : p));
          setNotificationMessage({
            text: `Success: updated ${data.name}`,
            type: "success"
          });
          setTimeout(() => setNotificationMessage(null), 5000);
        })
          .catch(error => {
            console.log(error);
            setNotificationMessage({
              text: error.response.data.error,
              type: "error"
            });
            setTimeout(() => setNotificationMessage(null), 5000);
          });
      }
    } else {
      create({
        name: newName,
        number: newNumber
      }).then((data) => {
        setPersons(persons.concat(data));
        setNotificationMessage({
          text: `Success: added ${data.name}`,
          type: "success"
        });
        setTimeout(() => setNotificationMessage(null), 5000);
      })
        .catch(error => {
          console.log(error);
          setNotificationMessage({
            text: error.response.data.error,
            type: "error"
          });
          setTimeout(() => setNotificationMessage(null), 5000);
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