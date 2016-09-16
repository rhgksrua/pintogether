'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

import LogInGitHub from '../accounts/LoginGitHub';
import NavItem from './NavItem';

// make each nav item a component

class Nav extends Component {
  render() {
    return (
      <nav>
        <NavItem to='/me' itemName='meme' />
        <div>
          <h1>PinTogether</h1>
        </div>
        <div>
          <LogInGitHub />
        </div>
        <p>
          <Link to='/me'>Me</Link>
        </p>
        <p>
          <Link to='/u/username'>username</Link>
        </p>
      </nav>
    );
  }
}

export default Nav;


