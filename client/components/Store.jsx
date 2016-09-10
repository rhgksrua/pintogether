'user strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../reducers/reducer';

const store = createStore(reducer);

class Store extends Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
        { /* <RouterComponent /> */ }
      </Provider>
    );
  }
}

export default Store;
