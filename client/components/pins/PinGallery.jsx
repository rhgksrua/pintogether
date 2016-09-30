'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';

import Pin from './Pin';

class PinGallery extends Component {
  render() {
    const { pinsReducer: { pins } } = this.props;
    const allPins = pins.map(el => {
      return (
        <Pin key={el._id} imageURL={el.pin.url} title={el.pin.title} />
      );
    });
    return (
      <Masonry
        className={'pin-gallery'}
        elementType={'ul'}
      >
        {allPins}
      </Masonry>
    );
  }
}

const mapStateToProps = state => {
  const { pinsReducer } = state;
  return {
    pinsReducer
  };
}

export default connect(mapStateToProps)(PinGallery);
