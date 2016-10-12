'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

import LogInGitHub from '../accounts/LoginGitHub';
import NavItem from './NavItem';

// make each nav item a component

class Nav extends Component {
  render() {
    const { username, loggedIn } = this.props;
    return (
      <nav className='nav-container'>
        <div className='nav-small'>
          {/* need to toggle this nav */}
          <div className='nav-item-container'>
            <div className='close-menu'>X</div>
            <NavItem to='/' itemName='PinTogether' onlyActiveOnIndex={true} />
            <NavItem to='/all' itemName='All' />
            <NavItem to='/create' itemName='Create' />
            {loggedIn && username &&
              <NavItem to={`/u/${username}`} itemName={username} />
            }
            {loggedIn && username &&
              <NavItem to='/logout' itemName='Log Out' />
            }
            {!loggedIn &&
              <LogInGitHub />
            }
          </div>
        </div>
        <div className='nav-large'>
          <NavItem to='/' itemName='PinTogether' onlyActiveOnIndex={true} />
          <NavItem to='/all' itemName='All' />
          <NavItem to='/create' itemName='Create' />
          {loggedIn && username &&
            <NavItem to={`/u/${username}`} itemName={username} />
          }
          {loggedIn && username &&
            <NavItem to='/logout' itemName='Log Out' />
          }
          {!loggedIn &&
            <LogInGitHub />
          }
        </div>
      </nav>
    );
  }
}

export default Nav;


