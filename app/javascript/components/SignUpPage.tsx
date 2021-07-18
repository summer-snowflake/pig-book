import React, { Component } from 'react'

import AccountMenu from 'components/login/AccountMenu'
import SignUpCard from 'components/login/SignUpCard'

class SignInPage extends Component {
  render(): JSX.Element {
    return (
      <div className="sign-up-page-component center-container">
        <div className='row'>
          <div className='col-3'>
            <AccountMenu />
          </div>
          <div className='col'>
            <SignUpCard />
          </div>
        </div>
      </div>
    )
  }
}

export default SignInPage
