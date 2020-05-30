import React, { Component } from 'react'

import SettingsMenu from 'components/settings/settingsMenu'
import PlaceSettings from 'components/settings/place/placeSettings'

class PlacePage extends Component {
  render(): JSX.Element {
    return (
      <div className='place-page-component container'>
        <div className='row'>
          <div className='col-3 d-none d-lg-block'>
            <SettingsMenu />
          </div>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <PlaceSettings />
          </div>
        </div>
      </div>
    )
  }
}

export default PlacePage
