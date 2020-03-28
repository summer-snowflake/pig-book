import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import DashboardContainer from 'components/dashboard/dashboardContainer'

import 'stylesheets/dashboard.sass'

class DashboardPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='dashboard-page-component container-fluid'>
        <div className='row'>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <div className='card'>
              <div className='card-header'>
                <i className='fas fa-chart-bar left-icon' />
                {t('menu.dashboard')}
              </div>
              <div className='card-body with-background-image'>
                <DashboardContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(DashboardPage)
