'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllPins } from '../actions/pinsActions';
import PinGallery from './pins/PinGallery';

/**
 *
 * @returns {undefined}
 */
class AllPins extends Component {
  componentDidMount() {
    const { getAllPins } = this.props;
    getAllPins();
  }
  render() {
    const { pinsReducer: { pins } } = this.props;
    return (
      <div className='all-pins-container'>
        <h3 className='all-pins-title page-title'>All Pins</h3>
        <PinGallery pins={pins} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { pinsReducer } = state;
  return {
    pinsReducer
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllPins: () => {
      dispatch(fetchAllPins());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPins);


