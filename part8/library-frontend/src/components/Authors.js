import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, CHANGE_AUTHOR_BIRTH } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState(null);
  const [changeBirthyear] = useMutation(CHANGE_AUTHOR_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (e) => console.log(e),
  });

  if (!props.show || !result?.data) {
    return null;
  }

  const authors = result.data.allAuthors;
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const changeAuthorBirthyear = (event) => {
    event.preventDefault();
    changeBirthyear({
      variables: {
        name: name.value,
        setBornTo: Number(event.target.year.value),
      },
    });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.authenticated && (
        <div>
          <h3>Set birthyear</h3>
          <form onSubmit={changeAuthorBirthyear}>
            <Select defaultValue={name} onChange={setName} options={options} />
            born <input name="year" type="text" /> <br />
            <button type="submit">update author</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
