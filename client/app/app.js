require('../assets/scss/app.scss');

import React from 'react';
import { RouterInit } from './components/App.react.js';

RouterInit();

window.React = React;

if (module.hot) {
  module.hot.accept();
}
