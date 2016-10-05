'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';

import Pin from './Pin';

import { pinLiked } from '../../actions/pinLikedAction';

class PinGallery extends Component {
  render() {
    const { userPinsReducer: { pins } } = this.props;
    const userPins = pins.map(el => {
      return (
        <Pin 
          key={el._id} 
          imageURL={el.pin.url} 
          title={el.pin.title} 
          username={el.username} 
          handleClick={handleClick}
          likes={likes}
          liked={liked ? true : false}
        />
      );
    });
    return (
      <Masonry
        className={'pin-gallery'}
        elementType={'div'}
      >
        {userPins}
      </Masonry>
    );
  }
}

const mapStateToProps = state => {
  const { userPinsReducer } = state;
  return {
    userPinsReducer
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: (pinId) => {
      dispatch(pinLiked(pinId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PinGallery);

