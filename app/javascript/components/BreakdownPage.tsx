import React, { Component } from 'react'

import SettingsMenu from 'components/settings/SettingsMenu'
import BreakdownCard from 'components/settings/breakdown/BreakdownCard'

class BreakdownPage extends Component {
  render(): JSX.Element {
    return (
      <div className='breakdown-page-component center-container'>
        <div className='row'>
          <div className='col-3'>
            <SettingsMenu />
          </div>
          <div className='col'>
            <BreakdownCard />
          </div>
        </div>
      </div>
    )
  }
}

export default BreakdownPage
