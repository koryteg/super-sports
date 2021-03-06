// /action_types/default.js
export const FETCH_DATA = "fetch_data";

// actions/default.js
import { FETCH_DATA } from "../action_types/default.js";
export function fetchDataFunction() {
  let testVar = "Hello";
  return {
    type: FETCH_DATA,
    payload: testVar
  };
}

// reducers/default_reducer.js
import { FETCH_DATA } from "../action_types/default.js";

export function defaultFunction() {
  let testVar = "Hello";

  return {
    type: FETCH_DATA,
    payload: testVar
  };
}

// reducers/index
import { combineReducers } from "redux";

import defaultReducer from "./default-reducer";

const rootReducers = combineReducers({
  default: defaultReducer
});

export default rootReducers;

// App.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { defaultFunction } from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.defaultFunction();
  }
  render() {
    return <div>React Redux Starter Template</div>;
  }
}
function mapStateToProps(state) {
  return {
    default: state.default
  };
}
export default connect(mapStateToProps, { defaultFunction })(App);

// index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import reducers from "./reducers";
import ReduxPromise from "redux-promise";
const store = createStore(reducers, applyMiddleware(logger, ReduxPromise));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

asdfddssadfasdf;
