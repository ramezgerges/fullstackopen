const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  const toBeChanged = action.type.toLowerCase();
  const newState = { ...state };
  switch (action.type) {
    case "ZERO":
      return initialState;
    case "GOOD":
    case "BAD":
    case "OK":
      newState[toBeChanged]++;
      return newState;
    default:
      return initialState;
  }
};

export default counterReducer;
