import React, { Component } from 'react'

import LoginMenu from 'components/login/loginMenu'
import LoginMenuWithIcons from 'components/login/loginMenuWithIcons'
import SignInContainerContainer from 'components/login/signInContainer'

class SignInPage extends Component {
  render(): JSX.Element {
    return (
      <div className="sign-in-page-component container">
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <LoginMenu />
          </div>
          <div className='col-1 d-lg-none'>
            <LoginMenuWithIcons />
          </div>
          <div className='col'>
            <SignInContainerContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default SignInPage
