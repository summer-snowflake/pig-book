import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'

import { AdminUser } from 'types/api'
import UserTableRecord from 'components/admin/userTableRecord'
import { RootState } from 'reducers/rootReducer'
import { ThunkDispatch } from 'redux-thunk'
import { getUsers } from 'actions/usersAction'
import { Action } from 'redux'

interface StateProps {
  users: {
    users: AdminUser[];
  };
}

interface DispatchProps {
  getUsers: () => void;
}

type Props = I18nProps & StateProps & DispatchProps

class UsersListContainer extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.props.getUsers()
  }

  render(): JSX.Element {
    const { t } = this.props

    return (
      <div className='users-list-component'>
        <table className='table'>
          <tbody>
            <tr>
              <th />
              <th>{t('admin.userEmail')}</th>
              <th />
            </tr>
            {this.props.users.users.map((user) => (
              <UserTableRecord key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapState(state: RootState): StateProps {
  return {
    users: state.users
  }
}

function mapDispatch(dispatch: ThunkDispatch<RootState, undefined, Action>): DispatchProps {
  return {
    getUsers(): void {
      dispatch(getUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(withTranslation()(UsersListContainer))
