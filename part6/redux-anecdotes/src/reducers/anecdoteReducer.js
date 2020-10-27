import anecdoteService from "../services/anecdoteService";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "UPVOTE": {
      const index = state.findIndex(
        (anecdote) => anecdote.id === action.data.id
      );
      const newState = [...state];
      newState[index].votes = state[index].votes + 1;
      newState.sort((a, b) => b.votes - a.votes);
      return newState;
    }
    case "ADD": {
      const newState = [...state];
      newState.push(action.data);
      newState.sort((a, b) => b.votes - a.votes);
      return newState;
    }
    case "INIT":
      return action.data;
  }
  return state;
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.newAnecdote(content);
    return dispatch({
      type: "ADD",
      data: anecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes,
    });
  };
};

export const upvoteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.upvoteAnecdote(anecdote);
    dispatch({
      type: "UPVOTE",
      data: { id: anecdote.id },
    });
  };
};
export default anecdoteReducer;
