import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import UsersListContainer from 'components/admin/usersListContainer'

class AdminUsersPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='admin-users-page-component container-fluid'>
        <div className='row'>
          <div className='col-1 d-lg-none' />
          <div className='col'>
            <div className='card'>
              <div className='card-header'>
                <i className='fas fa-user left-icon' />
                {t('menu.adminUsers')}
              </div>
              <div className='card-body with-background-panel'>
                <UsersListContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(AdminUsersPage)
