import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  blogs: blogReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
