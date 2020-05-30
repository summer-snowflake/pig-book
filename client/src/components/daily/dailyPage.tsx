import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

class DailyPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='daily-page-component container-fluid'>
        <div className='row'>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <div className='card'>
              <div className='card-header'>
                <i className='fas fa-chart-line left-icon' />
                {t('menu.daily')}
              </div>
              <div className='card-body with-background-image' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(DailyPage)
