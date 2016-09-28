'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllPins } from '../actions/pinsActions';

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
      <div>
        <p>All Pins</p>
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


