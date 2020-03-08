import React, { Component } from 'react'
import { User } from 'types/api'

interface Props {
  user: User;
}

class UserTableRecord extends Component<Props> {
  render(): JSX.Element {
    return (
      <tr className='user-table-record-component'>
        <td>
          {this.props.user.admin && (
            <i className='fas fa-crown red' />
          )}
        </td>
        <td>
          <i className='far fa-envelope left-icon' />
          {this.props.user.email}
        </td>
      </tr>
    )
  }
}

export default UserTableRecord
