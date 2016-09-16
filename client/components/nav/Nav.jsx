'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

import LogInGitHub from '../accounts/LoginGitHub';
import NavItem from './NavItem';

// make each nav item a component

class Nav extends Component {
  render() {
    return (
      <nav className='nav-container'>
        <NavItem to='/' itemName='PinTogether' />
        <NavItem to='/all' itemName='All' />
        <NavItem to='/me' itemName='Me' />
        <LogInGitHub />
      </nav>
    );
  }
}

export default Nav;


