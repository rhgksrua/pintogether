'use strict';

import React, { Component } from 'react';

/**
 *
 * @returns {undefined}
 */
class UserPins extends Component {
  componentDidMount() {
    // fetch all pins
  }
  handleFetchPins() {
  }
  render() {
    const userId = this.props.params.userId ? this.props.params.userId : 'n/a';
    return (
      <div>
        <p>{userId}</p>
      </div>
    );
  }
}

export default UserPins;


