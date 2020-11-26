import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_BOOKS, GET_BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const [books, setBooks] = useState(null);
  const [getBooksByGenre, resultByGenre] = useLazyQuery(GET_BOOKS_BY_GENRE);
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (genre)
      getBooksByGenre({
        variables: {
          genre,
        },
      });
  }, [genre, getBooksByGenre]);

  useEffect(() => {
    if (genre && resultByGenre.data) setBooks(resultByGenre.data.allBooks);
    if (!genre && result.data) setBooks(result.data.allBooks);
  }, [genre, result.data, resultByGenre.data]);

  useEffect(() => {
    if (result?.data) result.refetch();
    if (resultByGenre?.data) resultByGenre.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  if (!props.show || !books || !result.data) {
    return null;
  }

  const genres = new Set();
  result.data.allBooks.forEach((book) => {
    book.genres.forEach((genre) => genres.add(genre));
  });

  return (
    <div>
      <h2>books</h2>

      {genre ? `in genre ${genre}` : "in all genres"}
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
      {Array.from(genres).map((genre, index) => (
        <button type="button" key={index} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button type="button" onClick={() => setGenre(null)}>
        all genres
      </button>
    </div>
  );
};

export default Books;
