import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import PlacesList from 'components/settings/place/PlacesList'

class PlaceCard extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='place-settings-component card'>
        <div className='card-header'>
          <i className='fas fa-map-marker-alt left-icon' />
          {t('menu.place')}
        </div>
        <div className='card-body with-background-image'>
          <PlacesList />
        </div>
      </div>
    )
  }
}

export default withTranslation()(PlaceCard)
