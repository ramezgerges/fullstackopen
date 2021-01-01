import { useLazyQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { BOOK_ADDED, GET_BOOKS_BY_GENRE, GET_FAV_GENRE } from "../queries";

const RecommendedBooks = (props) => {
  const [getBooks, result] = useLazyQuery(GET_BOOKS_BY_GENRE);
  const [getGenre, genreResult] = useLazyQuery(GET_FAV_GENRE, {
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (props.authenticated) getGenre();
  }, [getGenre, props]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (result?.data) result.refetch();
    },
  });

  useEffect(() => {
    const genre = genreResult?.data?.me.favoriteGenre;
    if (genre) getBooks({ variables: { genre } });
  }, [genreResult, getBooks]);

  if (!props.show || !result.data || !props.authenticated) {
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
