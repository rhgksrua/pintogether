'use strict';

import React, { Component } from 'react';

class Pin extends Component {
  render() {
    const { imageURL, title } = this.props;
    return (
      <li className='pin'>
        <p>{title}</p>
        <img src={imageURL} />
      </li>
    );
  }
}

export default Pin;
