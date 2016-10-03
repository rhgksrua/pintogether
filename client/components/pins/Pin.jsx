'use strict';

import React, { Component } from 'react';

import NavItem from '../nav/NavItem';

class Pin extends Component {
  render() {
    const { imageURL, title, username } = this.props;
    return (
      <div className='pin'>
        <img className='pin-image' src={imageURL} />
        <h5 className='pin-title'>{title}</h5>
        <div className='pin-username'>
          <NavItem to={`/u/${username}`} itemName={username} />
        </div>
        <p className='likes'>Likes: 0</p>
      </div>
    );
  }
}

export default Pin;
