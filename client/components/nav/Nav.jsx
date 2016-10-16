'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import LogInGitHub from '../accounts/LoginGitHub';
import NavItem from './NavItem';

import { toggleMenu } from '../../actions/navActions';

// make each nav item a component

export class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  handleResize(e) {
    this.setState({
      windowWidth: window.innerWidth
    });
  }
  toggleMenu() {
    this.props.toggleMenu();
  }
  render() {
    const { username, loggedIn, navReducer: { show } } = this.props;
    const navClassName = show ? 'nav-small' : 'nav-small hide';
    const toggleClassName = show ? 'small-toggle hide' : 'small-toggle';
    const titleClassName = show ? 'nav-title-small hide': 'nav-title-small';

    // hide/show mobile menu.
    const mobileView = this.state.windowWidth <= 640 ? true : false;

    return (
      <nav className='nav-container'>
        {mobileView &&
        <div>
          <div className={titleClassName}>PT</div>
          <div className={toggleClassName} onClick={this.toggleMenu.bind(this)}>
            <FontAwesome
              className='nav-menu fa-2x'
              name='bars'
            />
          </div>
          <div className={navClassName} onClick={this.toggleMenu.bind(this)}>
            <div className='close-menu'>
              <FontAwesome
                className='fa-2x'
                name='times'
              />
            </div>
            <div className='nav-item-container'>
              <NavItem to='/' itemName='PinTogether' onlyActiveOnIndex={true} />
              <NavItem to='/all' itemName='All' />
              {loggedIn && username &&
              <NavItem to='/create' itemName='Create' />
              }
              {loggedIn && username &&
                <NavItem to={`/u/${username}`} itemName={username} />
              }
              {loggedIn && username &&
                <NavItem to='/logout' itemName='Log Out' linkClass='logout' />
              }
              {!loggedIn &&
                <LogInGitHub />
              }
            </div>
          </div>
        </div>
        }
        {!mobileView &&
        <div className='nav-large'>
          <NavItem to='/' itemName='PinTogether' onlyActiveOnIndex={true} />
          <NavItem to='/all' itemName='All' />
          {loggedIn && username &&
          <NavItem to='/create' itemName='Create' />
          }
          {loggedIn && username &&
            <NavItem to={`/u/${username}`} itemName={username} />
          }
          {loggedIn && username &&
            <NavItem to='/logout' itemName='Log Out' linkClass='logout' />
          }
          {!loggedIn &&
            <LogInGitHub />
          }
        </div>
        }
      </nav>
    );
  }
}

const mapStateToProps = state => {
  const { navReducer } = state;
  return {
    navReducer
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu());
    }
  };
}

// Fourth param required for using react router activeClassName with redux
// As of this comment, react-router is still version 2 but supposedly,
// react-router@^3.0 has this fixed.
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Nav);
