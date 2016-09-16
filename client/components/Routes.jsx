'use strict';

import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import NoMatch from './NoMatch';
import Home from './Home';
import Me from './accounts/Me';
import UserPins from './accounts/UserPins';
import AllPins from './AllPins';

class RouterComponent extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='/me' component={UserPins} />
          <Route path='/all' component={AllPins} />
          <Route path='/u/:userId' component={UserPins} />
          <Route path='*' component={NoMatch} />
        </Route>
      </Router>
    );
  }
}

export default RouterComponent;
