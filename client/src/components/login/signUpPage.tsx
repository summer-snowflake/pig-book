import React, { Component } from 'react'

import LoginMenu from 'components/login/loginMenu'
import SignUpContainer from 'components/login/signUpContainer'

class SignUpPage extends Component {
  render(): JSX.Element {
    return (
      <div className="sign-up-page-component container">
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <LoginMenu />
          </div>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <SignUpContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpPage
