'use strict';

import React, { Component } from 'react';

import NavItem from '../nav/NavItem';

class Pin extends Component {
  handleClick() {
    console.log('clicked like');
    const { pinKey } = this.props;
    this.props.handleClick(pinKey);
  }
  render() {
    const { imageURL, title, username, likes, liked } = this.props;
    return (
      <div className='pin'>
        <img className='pin-image' src={imageURL} />
        <h5 className='pin-title'>{title}</h5>
        <div className='pin-username'>
          <NavItem to={`/u/${username}`} itemName={username} />
        </div>
          <p className='likes' onClick={this.handleClick.bind(this)}>
            Likes: {likes} {liked.toString()}
          </p>
      </div>
    );
  }
}

export default Pin;
