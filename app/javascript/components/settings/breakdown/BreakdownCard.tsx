import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import BreakdownsList from 'components/settings/breakdown/BreakdownsList'

class BreakdownSettings extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='breakdown-settings-component'>
        <div className='card'>
          <div className='card-header'>
            <i className='fas fa-list left-icon' />
            {t('menu.breakdown')}
          </div>
          <div className='card-body with-background-image'>
            <BreakdownsList />
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(BreakdownSettings)
