'use strict';

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import NavItem from '../nav/NavItem';

class Pin extends Component {
  handleClick() {
    const { pinKey } = this.props;
    this.props.handleClick(pinKey);
  }
  handleDeletePin() {
    const { pinKey } = this.props;
    this.props.handleDeletePin(pinKey);
  }
  render() {
    const { owner, imageURL, title, username, likes, liked } = this.props;

    return (
      <div className='pin'>
        {owner &&
        <p onClick={this.handleDeletePin.bind(this)}>DELETE</p>
        }
        <img className='pin-image' src={imageURL} />
        <h5 className='pin-title'>{title}</h5>
        <div className='pin-username'>
          <NavItem to={`/u/${username}`} itemName={username} />
        </div>
          <p className='likes' onClick={this.handleClick.bind(this)}>
            <span className='likes-counter'>Likes: {likes}</span>
            {liked &&
            <span className='user-liked'>
              <FontAwesome
                className=''
                name='heart'
              />
            </span>
            }
          </p>
      </div>
    );
  }
}

export default Pin;
