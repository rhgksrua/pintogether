'use strict';

import React, { Component } from 'react';

class Pin extends Component {
  render() {
    const { imageURL, title, username } = this.props;
    return (
      <div className='pin'>
        <img className='pin-image' src={imageURL} />
        <h5 className='pin-title'>{title}</h5>
        <p className='pin-username'>{username}</p>
        <p className='likes'>Likes: 0</p>
      </div>
    );
  }
}

export default Pin;
