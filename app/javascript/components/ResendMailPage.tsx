import React, { Component } from 'react'

import AccountMenu from 'components/login/AccountMenu'
import ResendMailCard from 'components/login/ResendMailCard'

class ResendMailPage extends Component {
  render(): JSX.Element {
    return (
      <div className="resend-mail-page-component center-container">
        <div className='row'>
          <div className='col-3'>
            <AccountMenu />
          </div>
          <div className='col'>
            <ResendMailCard />
          </div>
        </div>
      </div>
    )
  }
}

export default ResendMailPage
