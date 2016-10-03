'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserPinGallery from '../pins/UserPinGallery';

import { fetchUserPins } from '../../actions/userPinsActions';



/**
 *
 * @returns {undefined}
 */
export class UserPins extends Component {
  componentDidMount() {
    const { getUserPins, params: { username } } = this.props;
    getUserPins(username);
  }
  render() {
    const { params: { username } } = this.props;
    return (
      <div className='user-pins-container'>
        <h3>{username}</h3>
        <UserPinGallery />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserPins: (username) => {
      dispatch(fetchUserPins(username));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPins);
