import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      filter
      <input onChange={(event) => dispatch(setFilter(event.target.value))} />
    </div>
  );
};

export default Filter;
