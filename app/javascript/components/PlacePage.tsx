import React, { Component } from 'react'

import SettingsMenu from 'components/settings/SettingsMenu'
import PlaceCard from 'components/settings/place/PlaceCard'

class PlacePage extends Component {
  render(): JSX.Element {
    return (
      <div className='place-page-component center-container'>
        <div className='row'>
          <div className='col-3'>
            <SettingsMenu />
          </div>
          <div className='col'>
            <PlaceCard />
          </div>
        </div>
      </div>
    )
  }
}

export default PlacePage
