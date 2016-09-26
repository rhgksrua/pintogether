'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { checkLogin } from '../actions/userActions';
import Nav from './nav/Nav';

class App extends Component {
  componentDidMount() {
    this.props.checkLogin();
  }
  render() {
    // Check username
    const { username, loggedIn } = this.props;
    return (
      <div>
        <Nav username={username} loggedIn={loggedIn} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { username, loggedIn } = state.userReducer;
  return {
    username,
    loggedIn
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkLogin: () => {
      dispatch(checkLogin());
    }
  };
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
