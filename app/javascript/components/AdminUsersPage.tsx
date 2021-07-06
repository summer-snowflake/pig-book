import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import AdminMenu from 'components/admin/AdminMenu'
import UsersList from 'components/admin/UsersList'

import 'stylesheets/admin.sass'

class AdminUsersPage extends Component<I18nProps> {
  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='admin-users-page-component'>
        <div className='row'>
          <div className='col'>
            <AdminMenu />
            <div className='card'>
              <div className='card-header'>
                <i className='fas fa-user left-icon' />
                {t('menu.adminUsers')}
              </div>
              <div className='card-body with-background-panel'>
                <UsersList />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation()(AdminUsersPage)
