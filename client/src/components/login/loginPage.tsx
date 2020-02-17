import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginMenu from 'components/login/loginMenu'
import SignInContainer from 'components/login/signInContainer'
import SignUp from 'components/login/signUp'

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page-component container">
        <Router>
          <div className='row'>
            <div className='col-3 d-none d-lg-block'>
              <LoginMenu />
            </div>
            <div className='col-1 d-lg-none'>
            </div>
            <div className='col'>
              <Route path='/users/sign_in' exact component={SignInContainer} />
              <Route path='/users/sign_up' exact component={SignUp} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default LoginPage;
