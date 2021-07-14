import React, { Component } from 'react'

import SettingsMenu from 'components/settings/SettingsMenu'
import UserSettingsCard from 'components/settings/user/UserSettingsCard'
import OptionsSettingsCard from 'components/settings/user/OptionsSettingsCard'
import MemoCard from 'components/settings/user/MemoCard'

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
            <UserSettingsCard />
            <OptionsSettingsCard />
            <MemoCard />
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsTopPage
