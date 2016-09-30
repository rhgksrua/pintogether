'use strict';

import React, { Component } from 'react';

class Pin extends Component {
  render() {
    const { imageURL, title } = this.props;
    return (
      <li className='pin'>
        <p>{title}</p>
        <img src={imageURL} width='100px' />
      </li>
    );
  }
}

export default Pin;
