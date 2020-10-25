const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIF":
      return action.data.notification;
  }
  return state;
};

export const setNotification = (notification) => {
  return {
    type: "SET_NOTIF",
    data: {
      notification,
    },
  };
};

export const removeNotification = () => {
  return {
    type: "SET_NOTIF",
    data: {
      notification: null,
    },
  };
};

export default notificationReducer;
