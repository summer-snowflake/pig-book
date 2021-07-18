import React, { Component } from 'react'

import AccountMenu from 'components/login/AccountMenu'
import SignInCard from 'components/login/SignInCard'

class SignInPage extends Component {
  render(): JSX.Element {
    return (
      <div className="sign-in-page-component center-container">
        <div className='row'>
          <div className='col-3'>
            <AccountMenu />
          </div>
          <div className='col'>
            <SignInCard />
          </div>
        </div>
      </div>
    )
  }
}

export default SignInPage
