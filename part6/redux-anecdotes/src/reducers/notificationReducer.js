const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIF":
      return action.data.notification;
  }
  return state;
};

export const setNotification = (notification, delay) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIF",
      data: {
        notification,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIF",
        data: {
          notification: null,
        },
      });
    }, delay * 1000);
  };
};

export default notificationReducer;
