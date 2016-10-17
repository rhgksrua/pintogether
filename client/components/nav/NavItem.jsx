'use strict';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class NavItem extends Component {
  render() {
    const { to, itemName, onlyActiveOnIndex, linkClass } = this.props;
    const navElement = to ?
      <Link 
        to={to} 
        className={linkClass ? linkClass : ''}
        activeClassName='nav-active' 
        onlyActiveOnIndex={onlyActiveOnIndex}
      >
        {itemName}
      </Link> 
      : 
      <p>{itemName}</p>; 

    return (
      <div className='nav-item'>
        {navElement}
      </div>
    );
  }
}

NavItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  to: PropTypes.string,
};

export default NavItem;

