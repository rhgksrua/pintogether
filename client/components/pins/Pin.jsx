'use strict';

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import NavItem from '../nav/NavItem';
import PinCloseModal from './PinCloseModal';
import PinLikes from './PinLikes';

class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // flag for remove pop up
      confirmPopup: false,
      brokenImage: false,
      // shows up for broken image link
      // should serve image from own server
      placeholder: 'https://placehold.it/200x200'
    };
  }
  handleClick() {
    const { pinKey, loggedIn } = this.props;
    if (!loggedIn) {
      // temporary message to alert users to log in if they want to like a post.
      alert('log in to like!');
      return;
    }
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
  handleImageError() {
    console.warn('broken pin image')
    this.setState({
      brokenImage: true
    });
  }
  render() {
    const { owner, imageURL, title, username, likes, liked } = this.props;
    const { brokenImage, placeholder } = this.state;
    const modalProps = {
      owner,
      handleTogglePopup: this.handleTogglePopup.bind(this),
      handleDeletePin: this.handleDeletePin.bind(this),
      confirmPopup: this.state.confirmPopup,
    };
    const pinLikesProps = {
      liked,
      likes,
      handleClick: this.handleClick.bind(this),
      owner
    };
    return (
      <div className='pin'>
        <PinCloseModal {...modalProps} />
        <img 
          className='pin-image' 
          src={!brokenImage ? imageURL : placeholder} 
          onError={this.handleImageError.bind(this)} 
        />
        <h5 className='pin-title'>{title}</h5>
        <div className='pin-username'>
          <NavItem to={`/u/${username}`} itemName={username} />
        </div>
          <div className='likes-container'>
            <PinLikes {...pinLikesProps} />
          </div>
      </div>
    );
  }
}

export default Pin;
