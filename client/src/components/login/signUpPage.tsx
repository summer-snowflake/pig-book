import React, { Component } from 'react';

import LoginMenu from 'components/login/loginMenu'
import SignUp from 'components/login/signUp'

class SignUpPage extends Component {
  render() {
    return (
      <div className="sign-up-page-component container">
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <LoginMenu />
          </div>
          <div className='col-1 d-lg-none'>
          </div>
          <div className='col'>
            <SignUp />
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
