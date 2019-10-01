import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import combinReducer from "./reducers";
const initialStates = {};
const middleWears = [thunk];

const store = createStore(
  combinReducer,
  initialStates,
  composeWithDevTools(applyMiddleware(...middleWears))
);

export default store;
