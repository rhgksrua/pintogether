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
      <div>
        <a href='auth/github'>Log in with Github</a>
      </div>
    );
  }
}

export default LogInGitHub;
