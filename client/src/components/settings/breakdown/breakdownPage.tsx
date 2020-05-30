import React, { Component } from 'react'

import SettingsMenu from 'components/settings/settingsMenu'
import BreakdownSettings from 'components/settings/breakdown/breakdownSettings'

class BreakdownPage extends Component {
  render(): JSX.Element {
    return (
      <div className='category-page-component container'>
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <SettingsMenu />
          </div>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <BreakdownSettings />
          </div>
        </div>
      </div>
    )
  }
}

export default BreakdownPage
