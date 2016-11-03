'user strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createDebounce from 'redux-debounced';
import promiseMiddleware from 'redux-promise-middleware';
import RavenMiddleware from 'redux-raven-middleware';
import reduxCatch from 'redux-catch';


import reducer from '../reducers/reducer';

const loggerMiddleware = createLogger();

let store;

if (process.env.NODE_ENV === 'production') {
  store = createStore(reducer, applyMiddleware(thunkMiddleware, promiseMiddleware()));
} else {
  store = createStore(reducer, applyMiddleware(thunkMiddleware, promiseMiddleware(), loggerMiddleware));
}

//const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

class Store extends Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}

export default Store;
