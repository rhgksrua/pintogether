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

function errorHanlder(err, getState) {
  console.error(error);
  console.debug('current state', getState());
}

import reducer from '../reducers/reducer';

const loggerMiddleware = createLogger();

//const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
const store = createStore(reducer, applyMiddleware(thunkMiddleware, promiseMiddleware(), loggerMiddleware));

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
