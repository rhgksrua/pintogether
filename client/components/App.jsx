'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

// Components
import LogInGitHub from './accounts/LoginGitHub';

class App extends Component {
  render() {
    return (
      <div>
        <LogInGitHub />
        <Link to='/me'>Me</Link>
        {this.props.children}
      </div>
    );
  }
}

export default App;
