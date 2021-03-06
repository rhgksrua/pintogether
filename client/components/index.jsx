import React from 'react';
import ReactDom from 'react-dom';

import Store from './Store';
import Routes from './Routes';

// Fetch.
import 'babel-polyfill';
import 'isomorphic-fetch';

// main styles
import './styles/reset.css';
import './styles/index.scss';

ReactDom.render((
  <Store>
    <Routes />
  </Store>
), document.getElementById('app'));
