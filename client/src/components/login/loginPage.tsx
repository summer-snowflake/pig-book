import React, { Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginMenu from 'components/login/loginMenu'
import SignIn from 'components/login/signIn'
import SignUp from 'components/login/signUp'

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page-component">
        <Router>
          <LoginMenu />
          <Route path='/users/sign_in' exact component={SignIn} />
          <Route path='/users/sign_up' exact component={SignUp} />
        </Router>
      </div>
    );
  }
}

export default LoginPage;