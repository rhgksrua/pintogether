'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import NoMatch from './NoMatch';
import Home from './Home';
import Me from './accounts/Me';
import UserPins from './accounts/UserPins';
import AllPins from './AllPins';
import CreatePin from './pins/CreatePin.jsx';
import logOutUser from '../actions/logOutUser';


class RouterComponent extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='/me' component={UserPins} />
          <Route path='/create' component={CreatePin} />
          <Route path='/all' component={AllPins} />
          <Route path='/u/:username' component={UserPins} />
          <Route path='/logout' onEnter={logOutUser.bind(Object.assign(this, { dispatch }))} />
          <Route path='*' component={NoMatch} />
        </Route>
      </Router>
    );
  }
}

export default connect()(RouterComponent);
