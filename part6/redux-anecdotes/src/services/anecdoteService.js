import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const anecdotes = await axios.get(baseUrl);
  return anecdotes.data;
};

const newAnecdote = async (content) => {
  const response = await axios.post(baseUrl, {
    content,
    votes: 0,
  });
  return response.data;
};

const upvoteAnecdote = async (anecdote) => {
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, {
    votes: anecdote.votes + 1,
  });
  return response.data;
};

export default { getAll, newAnecdote, upvoteAnecdote };
