import React, { Component } from 'react'

import SettingsMenu from 'components/settings/SettingsMenu'
import BaseSettings from 'components/settings/user/BaseSettings'
//import OptionsSettingsContainer from 'components/settings/user/optionsSettingsContainer'
//import MemoContainer from 'components/settings/user/memoContainer'

import 'stylesheets/settings.sass'

class SettingsTopPage extends Component {
  render(): JSX.Element {
    return (
      <div className="settings-top-page-component center-container">
        <div className='row'>
          <div className='col-3'>
            <SettingsMenu />
          </div>
          <div className='col'>
            <BaseSettings />
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsTopPage
