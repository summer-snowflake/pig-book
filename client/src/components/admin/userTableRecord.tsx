import React, { Component } from 'react'
import { AdminUser } from 'types/api'

import HumanTime from 'components/common/humanTime'

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
        <td className='icon-field-td'>
          {this.props.user.active ? (
            <i className='fas fa-user green' />
          ) : (
            <i className='far fa-user green' />
          )}
        </td>
        <td>
          <i className='far fa-envelope left-icon' />
          {this.props.user.email}
        </td>
        <td>
          {this.props.user.daily_option && (
            <i className='fas fa-chart-line' />
          )}
        </td>
        <td>
          <span className='total-count'>
            <i className='fas fa-th-large left-icon yellow' />
            {this.props.user.categories_count}
          </span>
          <span className='total-count'>
            <i className='fas fa-list left-icon light-blue' />
            {this.props.user.breakdowns_count}
          </span>
          <span className='total-count'>
            <i className='fas fa-map-marker-alt left-icon blue' />
            {this.props.user.places_count}
          </span>
          <span className='total-count'>
            <i className='fas fa-align-justify left-icon pink' />
            {this.props.user.records_count}
          </span>
        </td>
        <td>
          {this.props.user.created_at && (
            <span>
              <i className='fas fa-clock left-icon' />
              <HumanTime date={new Date(this.props.user.created_at)} />
            </span>
          )}
        </td>
        <td>
          {this.props.user.current_sign_in_at && (
            <span>
              <i className='fas fa-clock left-icon' />
              <HumanTime date={new Date(this.props.user.current_sign_in_at)} />
            </span>
          )}
        </td>
      </tr>
    )
  }
}

export default UserTableRecord
