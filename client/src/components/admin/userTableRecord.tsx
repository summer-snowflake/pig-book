import React, { Component } from 'react'
import { AdminUser } from 'types/api'

import 'stylesheets/admin.sass'

interface Props {
  user: AdminUser;
}

class UserTableRecord extends Component<Props> {
  render(): JSX.Element {
    return (
      <tr className='user-table-record-component'>
        <td className='crown-field-td'>
          {this.props.user.admin && (
            <i className='fas fa-crown red' />
          )}
        </td>
        <td>
          <i className='far fa-envelope left-icon' />
          {this.props.user.email}
        </td>
        <td>
          <i className='fas fa-clock left-icon' />
          {this.props.user.current_sign_in_at}
        </td>
        <td>
          <span className='total-count'>
            <i className='fas fa-th-large left-icon yellow' />
            {this.props.user.total.category}
          </span>
          <span className='total-count'>
            <i className='fas fa-list left-icon light-blue' />
            {this.props.user.total.breakdown}
          </span>
          <span className='total-count'>
            <i className='fas fa-map-marker-alt left-icon blue' />
            {this.props.user.total.place}
          </span>
          <span className='total-count'>
            <i className='fas fa-align-justify left-icon pink' />
            {this.props.user.total.record}
          </span>
        </td>
      </tr>
    )
  }
}

export default UserTableRecord
