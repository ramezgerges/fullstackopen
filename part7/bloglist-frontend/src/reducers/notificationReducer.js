const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIF":
      if (state?.timeout) clearTimeout(state.timeout);
      return action.data;
    case "CLEAR_NOTIF":
      if (state?.timeout) clearTimeout(state.timeout);
      return null;
    default:
      return state;
  }
};

export const setNotification = (notification, delay) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_NOTIF",
      data: {
        notification,
        timeout: setTimeout(() => {
          dispatch({
            type: "CLEAR_NOTIF",
          });
        }, delay * 1000),
      },
    });
  };
};

export default notificationReducer;
