/* eslint react/prop-types: 0 */
//TODO props validation

import React from "react";

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  );
};

const Total = ({ course }) => {
  return(
    <p><b>total of {course.parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</b></p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part part={part} key={part.id} />)}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;