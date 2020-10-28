const notificationReducer = (state = null, action) => {
  if (state?.timeout) clearTimeout(state.timeout);
  switch (action.type) {
    case "SET_NOTIF":
      return {
        notification: action.data.notification,
        timeout: action.data.timeout,
      };
  }
  return state;
};

export const setNotification = (notification, delay) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIF",
      data: {
        notification,
        timeout: setTimeout(() => {
          dispatch({
            type: "SET_NOTIF",
            data: {
              notification: null,
            },
          });
        }, delay * 1000),
      },
    });
  };
};

export default notificationReducer;
