import React, { Component } from 'react'

import SettingsMenu from 'components/settings/settingsMenu'
import BaseSettingsContainer from 'components/settings/baseSettingsContainer'
import MemoContainer from 'components/settings/memoContainer'

class SettingsTopPage extends Component {
  render(): JSX.Element {
    return (
      <div className="settings-top-page-component container">
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <SettingsMenu />
          </div>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <BaseSettingsContainer />
            <MemoContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsTopPage
