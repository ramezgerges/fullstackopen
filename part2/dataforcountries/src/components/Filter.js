/* eslint react/prop-types: 0 */
//TODO props validation

import React from "react";

const Filter = ({ nameFilter, setNameFilter }) => {
  return (
    <div>
      find countries <input onChange={event => setNameFilter(event.target.value)} value={nameFilter}/>
    </div>
  );
};

export default Filter;