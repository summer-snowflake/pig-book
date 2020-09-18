import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import UsersListContainer from 'components/admin/usersListContainer'
import AdminMenu from 'components/admin/adminMenu'
import AdminMenuWithIcons from 'components/admin/adminMenuWithIcons'

class AdminUsersPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='admin-users-page-component container-fluid'>
        <div className='row'>
          <div className='col-1 d-lg-none'>
            <AdminMenuWithIcons />
          </div>
          <div className='col'>
            <AdminMenu />
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
