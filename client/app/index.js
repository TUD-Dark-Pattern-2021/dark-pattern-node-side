import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './reducer/create';


import App from './App';

import 'antd/dist/antd.css';
import './styles/app.less'

const store = createStore();

render((
  <Provider store={store}>
      <App />
  </Provider>
), document.getElementById('app'));
