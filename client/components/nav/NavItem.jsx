'use strict';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// make each nav item a component

class NavItem extends Component {
  render() {
    const itemName = this.props.itemName;
    const to = this.props.to;
    const navElement = to ? 
      <Link to={to}>{itemName}</Link> : 
      <p>{itemName}</p>; 
    return (
      <div>
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



