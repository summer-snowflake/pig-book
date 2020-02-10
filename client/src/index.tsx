import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';

import 'stylesheets/bootstrap.min.css';
import 'stylesheets/bootstrap_overrides.sass';
import 'stylesheets/common.sass';

ReactDOM.render(<App />, document.getElementById('root'));
