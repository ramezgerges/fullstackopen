/* eslint react/prop-types: 0 */
//TODO props validation

import React from "react";

const FilteredPersons = ({ persons, filterName, deleteObject, setPersons, setNotificationMessage }) => {
  persons = persons.filter(person => person.name.toLowerCase().includes(filterName));

  const deletePersonFactory = person => () => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      deleteObject(person.id)
        .then(() => {
          setPersons(persons.filter(p => person.id !== p.id));
          setNotificationMessage({
            text: `Success: deleted ${person.name}`,
            type: "success"
          });
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch(error => {
          console.log(error);
          setNotificationMessage({
            text: `Error: couldn't delete ${person.name}`,
            type: "error"
          });
          setTimeout(() => setNotificationMessage(null), 5000);
        });
    }
  };
  return (
    <div>
      {persons.map(person =>
        <p key={person.name}>
          {person.name} {person.number} <button onClick={deletePersonFactory(person)}>delete</button>
        </p>)}
    </div>
  );
};

export default FilteredPersons;