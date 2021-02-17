import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import PiggyMenuWithIcons from 'components/piggy/piggyMenuWithIcons'
import PiggyBanksContainer from 'components/piggy/piggyBanksContainer'

import 'stylesheets/piggy.sass'

class PiggyPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='piggy-page-component container'>
        <div className='row'>
          <div className='col-1 d-lg-none'>
            <PiggyMenuWithIcons />
          </div>
          <div className='col'>
            <div className='card'>
              <div className='card-header'>
                <i className='fas fa-piggy-bank left-icon' />
                {t('menu.piggyBank')}
              </div>
              <div className='card-body with-background-image'>
                <PiggyBanksContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(PiggyPage)
