import React from 'react';
import ReactDom from 'react-dom';

import Store from './Store';
import Routes from './Routes';

import '../styles/reset.css';
import '../styles/index.scss';

// Fetch.
import 'babel-polyfill';
import 'isomorphic-fetch';

// main styles
import './styles/index.scss';
import './styles/AllPins.scss';
import './styles/UserPins.scss';

ReactDom.render((
  <Store>
    <Routes />
  </Store>
), document.getElementById('app'));
