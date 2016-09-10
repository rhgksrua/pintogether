'use strict';

import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './App';
import NoMatch from './NoMatch';

class RouterComponent extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <Route path='*' component={NoMatch} />
        </Route>
      </Router>
    );
  }
}

export default RouterComponent;
