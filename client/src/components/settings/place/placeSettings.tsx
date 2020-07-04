import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import PlaceCreateFormContainer from 'components/settings/place/placeCreateFormContainer'
import PlacesListContainer from 'components/settings/place/placesListContainer'

class PlaceSettings extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='place-settings-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-map-marker-alt left-icon' />
            {t('menu.place')}
          </div>
          <div className='card-body with-background-image'>
            <PlaceCreateFormContainer />
            <PlacesListContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(PlaceSettings)
