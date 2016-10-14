'use strict';

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import NavItem from '../nav/NavItem';
import PinCloseModal from './PinCloseModal';

class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // flag for remove pop up
      confirmPopup: false,
      brokenImage: false,
      placeholder: 'https://placehold.it/200x200'
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
  handleImageError() {
    // if user submitted broken image...
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
    return (
      <div className='pin'>
        {/*<PinCloseModal {...modalProps} /> */}

        <div className='pin-close-box-container'>
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
        </div>
        <img className='pin-image' src={!brokenImage ? imageURL : placeholder} onError={this.handleImageError.bind(this)} />
        <h5 className='pin-title'>{title}</h5>
        <div className='pin-username'>
          <NavItem to={`/u/${username}`} itemName={username} />
        </div>
          <div className='likes-container'>
            <p className='likes' onClick={this.handleClick.bind(this)}>
              {liked &&
              <span className='user-liked'>
                <FontAwesome
                  className=''
                  name='heart'
                />
              </span>
              }
              {!liked &&
              <span className='user-not-liked'>
                <FontAwesome
                  className=''
                  name='heart'
                />
              </span>
              }
              <span className='likes-counter'>{likes}</span>
            </p>
          </div>
      </div>
    );
  }
}

export default Pin;
