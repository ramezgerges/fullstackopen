/* eslint react/prop-types: 0 */
//TODO props validation

import React from "react";

const FilteredPersons = ({ persons, filterName }) => {
  persons = persons.filter(person => person.name.toLowerCase().includes(filterName));
  return (
    <div>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  );
};

export default FilteredPersons;