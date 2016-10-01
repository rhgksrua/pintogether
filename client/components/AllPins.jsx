'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllPins } from '../actions/pinsActions';
import PinGallery from './pins/PinGallery';

import './styles/AllPins.scss';

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
    return (
      <div className='all-pins-container'>
        <p>All Pins</p>
        <PinGallery test='hello world' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllPins: () => {
      dispatch(fetchAllPins());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPins);


