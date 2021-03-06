import React, { Component } from 'react'
import { AdminUser } from 'types/api'

import HumanTime from 'components/common/humanTime'
import FromNow from 'components/common/fromNow'

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
          <span>
            {this.props.user.daily_option && (
              <i className='fas fa-chart-line right-icon' />
            )}
          </span>
          <span>
            {this.props.user.unlimited_option && (
              <i className='fas fa-infinity right-icon' />
            )}
          </span>
          <span>
            {this.props.user.piggy_bank_option && (
              <i className='fas fa-piggy-bank right-icon' />
            )}
          </span>
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
            <i className='fas fa-sitemap left-icon pink' />
            {this.props.user.records_count}
          </span>
          <span className='total-count'>
            <i className='fas fa-bookmark left-icon green' />
            {this.props.user.tags_count}
          </span>
        </td>
        <td>
          {this.props.user.created_at && (
            <span>
              <i className='fas fa-clock left-icon' />
              <HumanTime date={new Date(this.props.user.created_at)} />
              <FromNow date={new Date(this.props.user.created_at)} />
            </span>
          )}
        </td>
        <td>
          {this.props.user.current_sign_in_at && (
            <span>
              <i className='fas fa-clock left-icon' />
              <HumanTime date={new Date(this.props.user.current_sign_in_at)} />
              <FromNow date={new Date(this.props.user.current_sign_in_at)} />
            </span>
          )}
        </td>
        <td>
          {this.props.user.updated_at && (
            <span>
              <i className='fas fa-clock left-icon' />
              <HumanTime date={new Date(this.props.user.updated_at)} />
              <FromNow date={new Date(this.props.user.updated_at)} />
            </span>
          )}
        </td>
      </tr>
    )
  }
}

export default UserTableRecord
