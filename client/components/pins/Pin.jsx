'use strict';

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import NavItem from '../nav/NavItem';

class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // flag for remove pop up
      confirmPopup: false
    };
  }
  handleClick() {
    const { pinKey } = this.props;
    this.props.handleClick(pinKey);
  }
  handleDeletePin() {
    const { pinKey } = this.props;
    this.props.handleDeletePin(pinKey);
  }
  handleTogglePopup() {
    this.setState({
      confirmPopup: !this.state.confirmPopup
    });
  }
  render() {
    const { owner, imageURL, title, username, likes, liked } = this.props;
    return (
      <div className='pin'>
        {owner &&
        <p className='pin-close-box' onClick={this.handleTogglePopup.bind(this)}>
          <FontAwesome
            className='pin-close'
            name='times'
          />
        </p>
        }
        {this.state.confirmPopup && 
        <div className='confirm-remove-modal'>
          <p 
            className='confirm-remove-yes' 
            onClick={this.handleDeletePin.bind(this)}
          >
            <span>REMOVE</span>
          </p>
          <p 
            className='confirm-remove-no'
            onClick={this.handleTogglePopup.bind(this)}
          >
            <span>CANCEL</span>
          </p>
        </div>
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
