import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ALL_BOOKS, GET_FAV_GENRE } from "../queries";

const RecommendedBooks = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);
  const genreResult = useQuery(GET_FAV_GENRE);

  useEffect(() => {
    const genre = genreResult?.data?.me.favoriteGenre;
    if (genre) getBooks({ variables: { genre } });
  }, [genreResult, getBooks]);

  if (!props.show || !result.data) {
    return null;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      in favourite genre <b>{genreResult.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendedBooks;
