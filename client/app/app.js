require('../assets/scss/app.scss');

import React from 'react';
import Socket from './utils/WebUtils';
import Router from './components/App.react';

Router.init();
Socket.init();

window.React = React;

if (module.hot) {
  module.hot.accept();
}
