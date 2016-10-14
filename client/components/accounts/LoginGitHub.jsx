'use strict';

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

/**
 * Redirects user to github to signup or login.
 *
 * @returns {undefined}
 */
class LogInGitHub extends Component {
  render() {
    return (
      <div className='nav-item'>
        <a href='/auth/github'>
          <FontAwesome
            className='fa-lg'
            name='github'
          />
        </a>
      </div>
    );
  }
}

export default LogInGitHub;
