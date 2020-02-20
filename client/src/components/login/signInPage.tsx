import React, { Component } from 'react';

import LoginMenu from 'components/login/loginMenu'
import SignInContainer from 'components/login/signInContainer'

class SignInPage extends Component {
  render() {
    return (
      <div className="sign-in-page-component container">
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <LoginMenu />
          </div>
          <div className='col-1 d-lg-none'>
          </div>
          <div className='col'>
            <SignInContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default SignInPage;
