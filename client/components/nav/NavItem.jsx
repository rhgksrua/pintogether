'use strict';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class NavItem extends Component {
  render() {
    const itemName = this.props.itemName;
    const to = this.props.to;
    const navElement = to ? 
      <Link to={to}>{itemName}</Link> : 
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

