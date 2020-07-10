import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { UsersStore } from 'types/store'
import { getUsers } from 'actions/usersAction'
import { RootState } from 'reducers/rootReducer'
import UserTableRecord from 'components/admin/userTableRecord'
import Pagination from 'components/list/pagination'

interface StateProps {
  usersStore: UsersStore;
}

interface DispatchProps {
  getUsers: (params: { page: number }) => void;
}

type Props = I18nProps & StateProps & DispatchProps

class UsersListContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    const params = {
      page: 1
    }
    this.props.getUsers(params)

    this.handleClickPage = this.handleClickPage.bind(this)
  }

  handleClickPage(page: number): void {
    const params = {
      page: page
    }
    this.props.getUsers(params)
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='users-list-component'>
        <table className='table'>
          <tbody>
            <tr>
              <th />
              <th />
              <th>{t('admin.userEmail')}</th>
              <th />
              <th />
              <th>{t('admin.confirmedAt')}</th>
              <th>{t('admin.lastSignInAt')}</th>
            </tr>
            {this.props.usersStore.users.map((user) => (
              <UserTableRecord key={user.id} user={user} />
            ))}
          </tbody>
        </table>
        <div className='pagination-field'>
          {this.props.usersStore.maxPage > 1 && (
            <Pagination
              currentPage={this.props.usersStore.page}
              maxPage={this.props.usersStore.maxPage}
              onClickPage={this.handleClickPage}
            />
          )}
        </div>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    usersStore: state.users
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getUsers(params: { page: number }): void {
      dispatch(getUsers(params))
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(UsersListContainer))
