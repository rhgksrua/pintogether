'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';

import Pin from './Pin';

class PinGallery extends Component {
  render() {
    const { userPinsReducer: { pins } } = this.props;
    console.log('***', pins);
    const userPins = pins.map(el => {
      return (
        <Pin key={el._id} imageURL={el.pin.url} title={el.pin.title} username={el.username} />
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

export default connect(mapStateToProps)(PinGallery);

