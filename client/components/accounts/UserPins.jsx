'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserPinGallery from '../pins/UserPinGallery';
import PinGallery from '../pins/PinGallery';

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
  componentWillReceiveProps(nextProps) {
    // this is kind of a work around for inifinite fetch loop.
    // React-router keeps all components mounted unless you manually unmount it.
    // When going from /u/user1 to /u/user2, it will use the same UserPins component.
    // So, componentWillReceiveProps needs to be used to update new data.  However,
    // fetching inside componentWillReceiveProps updates the props and 
    // componentWillReceiveProps calls itself again.  It ends up in an inifinite loop.
    // The work around is that if username have not changed, fetch will not be fired.
    const { getUserPins } = nextProps;
    const oldUsername = this.props.params.username;
    const newUsername = nextProps.params.username;
    if (oldUsername !== newUsername) {
      getUserPins(newUsername);
    }
  }
  render() {
    const { 
      userPinsReducer: { pins }, 
      params
    } = this.props;
    return (
      <div className='user-pins-container'>
        <h3 className='page-title'>{params.username}</h3>
        <PinGallery pins={pins} params={params} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userPinsReducer  } = state;
  return { userPinsReducer };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserPins: (username) => {
      dispatch(fetchUserPins(username));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPins);
