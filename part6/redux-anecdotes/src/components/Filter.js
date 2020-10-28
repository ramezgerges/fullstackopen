import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  return (
    <div>
      filter
      <input onChange={(event) => props.setFilter(event.target.value)} />
    </div>
  );
};

export default connect(null, {
  setFilter,
})(Filter);
