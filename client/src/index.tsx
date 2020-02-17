import React from 'react';
import { render } from 'react-dom';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import App from 'components/app';
import rootReducer from 'reducers/rootReducer'

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

import 'stylesheets/bootstrap.min.css';
import 'stylesheets/bootstrap_overrides.sass';
import 'stylesheets/common.sass';

import 'plugins/i18n'

interface ExtendedWindow extends Window {
  [x: string]: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
declare var window: ExtendedWindow;

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
