'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';

import Pin from './Pin';

import { pinLiked } from '../../actions/pinLikedAction';

class PinGallery extends Component {
  render() {
    const { 
      handleClick, 
      pinsReducer: { pins },
      userReducer: { id },
    } = this.props;
    const allPins = pins.map(el => {
      const likes = el.likes.length;
      const liked = el.likes.some(like => {
        return like.userId === id;
      });
      return (
        <Pin 
          key={el._id} 
          pinKey={el._id}
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
        {allPins}
      </Masonry>
    );
  }
}

const mapStateToProps = state => {
  const { pinsReducer, userReducer } = state;
  return {
    pinsReducer,
    userReducer,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: (pinId) => {
      dispatch(pinLiked(pinId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PinGallery);
