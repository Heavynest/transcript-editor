import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import showResults from "./showResults";
import RouteMap from "./routers";
import {hashHistory} from 'react-router';

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
      <RouteMap history={hashHistory} />
  </Provider>,
  rootEl
);
