import React, { Component } from 'react'

import SettingsMenu from 'components/settings/settingsMenu'
import SettingsMenuWithIcons from 'components/settings/settingsMenuWithIcons'
import BaseSettingsContainer from 'components/settings/user/baseSettingsContainer'
import OptionsSettingsContainer from 'components/settings/user/optionsSettingsContainer'
import MemoContainer from 'components/settings/user/memoContainer'

class SettingsTopPage extends Component {
  render(): JSX.Element {
    return (
      <div className="settings-top-page-component container">
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <SettingsMenu />
          </div>
          <div className='col-1 d-lg-none'>
            <SettingsMenuWithIcons />
          </div>
          <div className='col'>
            <BaseSettingsContainer />
            <OptionsSettingsContainer />
            <MemoContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsTopPage
