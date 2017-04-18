'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';

import Pin from './Pin';

import { pinLiked } from '../../actions/pinLikedAction';
import { removePin } from '../../actions/removePin';

class PinGallery extends Component {
  render() {

    const { 
      pins,
      handleClick, 
      handleDeletePin,
      userReducer: { id, username, loggedIn },
      params,
    } = this.props;

    const allPins = pins.map(el => {

      const likes = el.likes.length;

      const liked = el.likes.some(like => {
        return like.userId === id;
      });

      // owner's user page.  Let's users delete pins.
      const owner = (el.username === username) ? true : false;
      return (
        <Pin 
          key={el._id} 
          pinKey={el._id}
          imageURL={el.pin.url} 
          title={el.pin.title} 
          username={el.username} 
          handleClick={handleClick}
          handleDeletePin={handleDeletePin}
          likes={likes}
          liked={liked ? true : false}
          owner={owner}
          loggedIn={loggedIn}
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
    },
    handleDeletePin: pinId => {
      dispatch(removePin(pinId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PinGallery);
