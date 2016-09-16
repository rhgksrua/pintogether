'use strict';

import React, { Component } from 'react';

/**
 * Redirects user to github to signup or login.
 *
 * @returns {undefined}
 */
class LogInGitHub extends Component {
  render() {
    return (
      <div className='nav-item'>
        <a href='auth/github'>GitHub</a>
      </div>
    );
  }
}

export default LogInGitHub;
