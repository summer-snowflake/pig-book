import React, { Component } from 'react'

import SettingsMenu from 'components/settings/SettingsMenu'
import TagCard from 'components/settings/tag/TagCard'

import 'stylesheets/tag.sass'

class TagPage extends Component {
  render(): JSX.Element {
    return (
      <div className='tag-page-component center-container'>
        <div className='row'>
          <div className='col-3'>
            <SettingsMenu />
          </div>
          <div className='col'>
            <TagCard />
          </div>
        </div>
      </div>
    )
  }
}

export default TagPage
