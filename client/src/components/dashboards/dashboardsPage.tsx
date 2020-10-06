import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import DashboardsContainer from 'components/dashboards/dashboardsContainer'
import DashboardMenuWithIcons from 'components/dashboard/dashboardMenuWithIcons'

import 'stylesheets/dashboard.sass'

class DashboardsPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='dashboards-page-component container-fluid'>
        <div className='row'>
          <div className='col-1 d-lg-none'>
            <DashboardMenuWithIcons />
          </div>
          <div className='col'>
            <div className='card'>
              <div className='card-header'>
                <i className='fas fa-chart-bar left-icon' />
                {t('menu.dashboard')}
              </div>
              <div className='card-body with-background-image'>
                <DashboardsContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(DashboardsPage)
