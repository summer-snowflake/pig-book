import React, { Component } from 'react'

import 'stylesheets/tag.sass'

import SettingsMenu from 'components/settings/settingsMenu'
import SettingsMenuWithIcons from 'components/settings/settingsMenuWithIcons'
import TagSettings from 'components/settings/tag/tagSettings'

class TagPage extends Component {
  render(): JSX.Element {
    return (
      <div className='tag-page-component container'>
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <SettingsMenu />
          </div>
          <div className='col-1 d-lg-none'>
            <SettingsMenuWithIcons />
          </div>
          <div className='col content'>
            <TagSettings />
          </div>
        </div>
      </div>
    )
  }
}

export default TagPage
